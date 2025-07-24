#include <stdio.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_wifi.h"
#include "esp_event.h"
#include "esp_log.h"
#include "esp_http_server.h"
#include "nvs_flash.h"
#include "esp_netif.h"
#include "esp_mac.h"
#include "lwip/ip4_addr.h"

// =============================================
// CONFIGURAÇÕES HARDCODED
// =============================================
#define WIFI_SSID      "ESP32-AP"
#define WIFI_PASS      "12345678"
#define WIFI_CHANNEL   6
#define MAX_CONNECTIONS 4
// =============================================

static const char *TAG = "EMBEDDED-AP";

// Variáveis globais para os arquivos embutidos
extern const uint8_t index_html_start[] asm("_binary_index_html_start");
extern const uint8_t index_html_end[]   asm("_binary_index_html_end");
extern const uint8_t favicon_ico_start[] asm("_binary_vite_svg_start");
extern const uint8_t favicon_ico_end[]   asm("_binary_vite_svg_end");
extern const uint8_t assets_index_js_start[] asm("_binary_index_js_start");
extern const uint8_t assets_index_js_end[]   asm("_binary_index_js_end");
extern const uint8_t assets_index_css_start[] asm("_binary_index_css_start");
extern const uint8_t assets_index_css_end[]   asm("_binary_index_css_end");

// Handler aprimorado para arquivos embutidos
static esp_err_t send_embedded_file(httpd_req_t *req, const uint8_t *start, const uint8_t *end, const char *content_type) {
    size_t file_size = end - start;
    
    // Headers de segurança e cache
    httpd_resp_set_hdr(req, "X-Content-Type-Options", "nosniff");
    httpd_resp_set_hdr(req, "Cache-Control", "public, max-age=604800");
    
    // Define o tipo de conteúdo explicitamente
    httpd_resp_set_type(req, content_type);
    
    return httpd_resp_send(req, (const char *)start, file_size);
}

// Handlers específicos atualizados
static esp_err_t js_get_handler(httpd_req_t *req) {
    ESP_LOGI(TAG, "Serving JS file: %s", req->uri);
    return send_embedded_file(req, assets_index_js_start, assets_index_js_end, "application/javascript");
}

static esp_err_t css_get_handler(httpd_req_t *req) {
    ESP_LOGI(TAG, "Serving CSS file: %s", req->uri);
    return send_embedded_file(req, assets_index_css_start, assets_index_css_end, "text/css");
}

static esp_err_t favicon_get_handler(httpd_req_t *req) {
    return send_embedded_file(req, favicon_ico_start, favicon_ico_end, "image/x-icon");
}

// Fallback para SPA
static esp_err_t fallback_handler(httpd_req_t *req) {
    ESP_LOGI(TAG, "Fallback SPA para: %s", req->uri);
    return send_embedded_file(req, index_html_start, index_html_end, "text/html");
}

// Configuração do servidor HTTP atualizada
httpd_handle_t start_webserver() {
    httpd_config_t config = HTTPD_DEFAULT_CONFIG();
    config.max_uri_handlers = 10;
    config.server_port = 80;
    config.uri_match_fn = httpd_uri_match_wildcard;

    httpd_handle_t server = NULL;
    if (httpd_start(&server, &config) == ESP_OK) {
        // Rotas explícitas para arquivos estáticos
        httpd_uri_t routes[] = {
            { .uri = "/assets/index.js", .method = HTTP_GET, .handler = js_get_handler, .user_ctx = NULL },
            { .uri = "/index.js", .method = HTTP_GET, .handler = js_get_handler, .user_ctx = NULL },
            { .uri = "/assets/index.css", .method = HTTP_GET, .handler = css_get_handler, .user_ctx = NULL },
            { .uri = "/favicon.ico", .method = HTTP_GET, .handler = favicon_get_handler, .user_ctx = NULL }
        };
        
        for (size_t i = 0; i < sizeof(routes)/sizeof(routes[0]); i++) {
            httpd_register_uri_handler(server, &routes[i]);
        }

        // Rota raiz
        httpd_register_uri_handler(server, &(httpd_uri_t){
            .uri = "/", .method = HTTP_GET, .handler = fallback_handler, .user_ctx = NULL
        });
        
        // Fallback para SPA (React Router)
        httpd_register_uri_handler(server, &(httpd_uri_t){
            .uri = "/*", .method = HTTP_GET, .handler = fallback_handler, .user_ctx = NULL
        });

        ESP_LOGI(TAG, "Servidor HTTP iniciado com suporte a React Router");
    }
    return server;
}
// [Mantido o resto do código igual: wifi_event_handler, wifi_init_softap, app_main]

// Handler de eventos WiFi
static void wifi_event_handler(void* arg, esp_event_base_t event_base, 
                             int32_t event_id, void* event_data) {
    if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_AP_STACONNECTED) {
        wifi_event_ap_staconnected_t* event = (wifi_event_ap_staconnected_t*) event_data;
        ESP_LOGI(TAG, "Dispositivo conectado! MAC: %02x:%02x:%02x:%02x:%02x:%02x", 
                event->mac[0], event->mac[1], event->mac[2], 
                event->mac[3], event->mac[4], event->mac[5]);
    } else if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_AP_STADISCONNECTED) {
        wifi_event_ap_stadisconnected_t* event = (wifi_event_ap_stadisconnected_t*) event_data;
        ESP_LOGI(TAG, "Dispositivo desconectado. MAC: %02x:%02x:%02x:%02x:%02x:%02x", 
                event->mac[0], event->mac[1], event->mac[2], 
                event->mac[3], event->mac[4], event->mac[5]);
    }
}

// Configuração do WiFi AP
void wifi_init_softap() {
    // Cria a interface AP primeiro
    esp_netif_t *ap_netif = esp_netif_create_default_wifi_ap();
    
    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&cfg));

    // Registra handlers de eventos
    ESP_ERROR_CHECK(esp_event_handler_instance_register(WIFI_EVENT,
                                                     ESP_EVENT_ANY_ID,
                                                     &wifi_event_handler,
                                                     NULL,
                                                     NULL));

    wifi_config_t wifi_config = {
        .ap = {
            .ssid = WIFI_SSID,
            .password = WIFI_PASS,
            .ssid_len = strlen(WIFI_SSID),
            .channel = WIFI_CHANNEL,
            .max_connection = MAX_CONNECTIONS,
            .authmode = WIFI_AUTH_WPA2_PSK,
            .pmf_cfg = {
                .required = false,
                .capable = true
            },
            .beacon_interval = 100  // Intervalo do beacon em ms (padrão: 100)
        },
    };

    // Se não houver senha, configura como rede aberta
    if (strlen(WIFI_PASS) == 0) {
        wifi_config.ap.authmode = WIFI_AUTH_OPEN;
    }

    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_AP));
    ESP_ERROR_CHECK(esp_wifi_set_config(ESP_IF_WIFI_AP, &wifi_config));
    
    // Configuração adicional para melhorar a conexão
    ESP_ERROR_CHECK(esp_wifi_set_ps(WIFI_PS_NONE));  // Desativa power saving
    ESP_ERROR_CHECK(esp_wifi_start());

    // Configuração do DHCP
    esp_netif_dhcps_stop(ap_netif);  // Para modificar configurações
    esp_netif_ip_info_t ip_info;
    IP4_ADDR(&ip_info.ip, 192, 168, 4, 1);
    IP4_ADDR(&ip_info.gw, 192, 168, 4, 1);
    IP4_ADDR(&ip_info.netmask, 255, 255, 255, 0);
    esp_netif_set_ip_info(ap_netif, &ip_info);
    esp_netif_dhcps_start(ap_netif);

    ESP_LOGI(TAG, "WiFi AP Configurado:");
    ESP_LOGI(TAG, "SSID: %s", WIFI_SSID);
    ESP_LOGI(TAG, "Senha: %s", WIFI_PASS);
    ESP_LOGI(TAG, "Canal: %d", WIFI_CHANNEL);
    ESP_LOGI(TAG, "Endereço IP: " IPSTR, IP2STR(&ip_info.ip));
    ESP_LOGI(TAG, "Máscara de rede: " IPSTR, IP2STR(&ip_info.netmask));
    ESP_LOGI(TAG, "Gateway: " IPSTR, IP2STR(&ip_info.gw));
}

void app_main() {
    // Inicializa NVS
    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK(ret);

    // Inicializa TCP/IP e event loop
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());

    // Configura WiFi
    wifi_init_softap();

    // Inicia servidor
    start_webserver();

    ESP_LOGI(TAG, "Sistema pronto. Aguardando conexões...");

    // Loop principal
    while (1) {
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}