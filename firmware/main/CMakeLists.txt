set(requires
    esp_http_server 
    esp_wifi 
    nvs_flash
)

set(COMPONENTS main cJSON driver)

idf_component_register(
    SRCS "main.c" "web/server.c" "web/wifi.c" "utils/extractReq.c" 
    "actuator/ledActuator.c"

    INCLUDE_DIRS "." "includes" 

    EMBED_FILES 
    embedded_files/index.html 
    embedded_files/vite.svg
    embedded_files/assets/index.js 
    embedded_files/assets/index.css 
    
    REQUIRES
    ${requires}
)

