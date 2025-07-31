#ifndef SERVER_H
#define SERVER_H

#include <stdio.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_wifi.h"
#include "esp_event.h"
#include "esp_log.h"
#include "esp_err.h"
#include "esp_http_server.h"
#include "nvs_flash.h"
#include "esp_netif.h"
#include "esp_mac.h"
#include "lwip/ip4_addr.h"
#include "cJSON.h"  


#include "driver/gpio.h"

#include "./structs/structData.h"
#include "./ledConfig.h"

#define WIFI_SSID      "ESP32-AP"
#define WIFI_PASS      "12345678"
#define WIFI_CHANNEL   6
#define MAX_CONNECTIONS 4

extern const uint8_t index_html_start[] asm("_binary_index_html_start");
extern const uint8_t index_html_end[]   asm("_binary_index_html_end");

extern const uint8_t favicon_ico_start[] asm("_binary_vite_svg_start");
extern const uint8_t favicon_ico_end[]   asm("_binary_vite_svg_end");

extern const uint8_t assets_index_js_start[] asm("_binary_index_js_start");
extern const uint8_t assets_index_js_end[]   asm("_binary_index_js_end");

extern const uint8_t assets_index_css_start[] asm("_binary_index_css_start");
extern const uint8_t assets_index_css_end[]   asm("_binary_index_css_end");

#define TAG "EMBEDDED-AP"

char *extract_req(httpd_req_t *req);
httpd_handle_t start_webserver();
void wifi_init_softap();

#endif 