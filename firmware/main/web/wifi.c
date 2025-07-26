#include "./includes/server.h"

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

void wifi_init_softap() {
    esp_netif_t *ap_netif = esp_netif_create_default_wifi_ap();
    
    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&cfg));

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
            .beacon_interval = 100 
        },
    };

    if (strlen(WIFI_PASS) == 0) {
        wifi_config.ap.authmode = WIFI_AUTH_OPEN;
    }

    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_AP));
    ESP_ERROR_CHECK(esp_wifi_set_config(ESP_IF_WIFI_AP, &wifi_config));
    
    ESP_ERROR_CHECK(esp_wifi_set_ps(WIFI_PS_NONE));  
    ESP_ERROR_CHECK(esp_wifi_start());

    esp_netif_dhcps_stop(ap_netif);  
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