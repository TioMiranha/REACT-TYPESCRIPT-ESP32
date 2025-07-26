#include "../includes/ledConfig.h"

/**
 * @brief 
 * * @param req 
 * @return 
 *
 *
 */
typedef char *(*func_t)(arg_t *args);

char led1_status[4] = "OFF";
char led2_status[4] = "OFF";

static void initGPIOS();
void selectControl(const char *led, const char *acao);


char *stateLed(arg_t *args)
{
    cJSON *json = cJSON_Parse(args->rcv);
    if (json == NULL)
    {
        ESP_LOGE(TAG_HTTP, "Erro fazer Parse no json");
    }

    cJSON *led = cJSON_GetObjectItem(json, "led");
    cJSON *acao = cJSON_GetObjectItem(json, "acao");

    if (!cJSON_IsString(led) || !cJSON_IsString(acao))
    {
        ESP_LOGE(TAG_HTTP, "Valores de status de cada led inválido ou não encontrado");
        cJSON_Delete(json);
    }
    
    ESP_LOGI(TAG_HTTP, "Controlando o led [%s] que esta no estado [%s]", led->valuestring, acao->valuestring);

    selectControl(led->valuestring, acao->valuestring);

    cJSON *response = cJSON_CreateObject();
    cJSON_AddStringToObject(response, "status", "success");
    cJSON_AddStringToObject(response, "led", led->valuestring);
    cJSON_AddStringToObject(response, "acao", acao->valuestring);

    char *response_str = cJSON_Print(response);

    cJSON_Delete(json);
    cJSON_Delete(response);
    return response_str;
}

void selectControl(const char *led, const char *acao)
{
    initGPIOS();
    if (strcmp(led, "led1") == 0)
    {
        gpio_set_level(LED1, strcmp(acao, "on") == 0 ? 1 : 0);
    }
    else if (strcmp(led, "led2") == 0)
    {
        gpio_set_level(LED2, strcmp(acao, "on") == 0 ? 1 : 0);
    }
}

static void initGPIOS()
{
    esp_rom_gpio_pad_select_gpio(LED1);
    gpio_set_direction(LED1, GPIO_MODE_OUTPUT);
    esp_rom_gpio_pad_select_gpio(LED2);
    gpio_set_direction(LED2, GPIO_MODE_OUTPUT);
    esp_rom_gpio_pad_select_gpio(LED_STATUS);
    gpio_set_direction(LED_STATUS, GPIO_MODE_OUTPUT);
    gpio_set_level(LED_STATUS, 0);
}