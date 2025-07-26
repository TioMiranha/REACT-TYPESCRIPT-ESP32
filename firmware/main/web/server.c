#include "./includes/server.h"

static esp_err_t send_embedded_file(httpd_req_t *req, const uint8_t *start, const uint8_t *end, const char *content_type) {
    size_t file_size = end - start;
    
    httpd_resp_set_hdr(req, "X-Content-Type-Options", "nosniff");
    httpd_resp_set_hdr(req, "Cache-Control", "public, max-age=604800");
    
    httpd_resp_set_type(req, content_type);
    
    return httpd_resp_send(req, (const char *)start, file_size);
}

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

static esp_err_t fallback_handler(httpd_req_t *req) {
    ESP_LOGI(TAG, "Fallback SPA para: %s", req->uri);
    return send_embedded_file(req, index_html_start, index_html_end, "text/html");
}

static esp_err_t led_get_handler(httpd_req_t *req) {
    arg_t args = {
        .rcv = extract_req(req)};

    char *led = stateLed(&args);
    if (!led)
    {
        ESP_LOGI(TAG_HTTP, "Erro no 'led' dentro de led_get_handler");
        return ESP_FAIL;
    }
    httpd_resp_sendstr(req, led);
    free(led);

    return ESP_OK;
}

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
            { .uri = "/led", .method = HTTP_POST, .handler = led_get_handler, .user_ctx = NULL },
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
