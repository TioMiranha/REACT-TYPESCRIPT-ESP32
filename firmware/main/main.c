#include "./includes/server.h"

void app_main() {
    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK(ret);

    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());

    wifi_init_softap();

    start_webserver();

    ESP_LOGI(TAG, "Sistema pronto. Aguardando conexões...");


    while (1) {
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}