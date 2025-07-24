
idf_component_register(
    SRCS "main.c"
    INCLUDE_DIRS "."
    REQUIRES esp_http_server esp_wifi nvs_flash
    EMBED_FILES 
        embedded_files/index.html 
        embedded_files/vite.svg
        embedded_files/assets/index.js 
        embedded_files/assets/index.css 
)

