#include "../includes/server.h"

char *extract_req(httpd_req_t *req)
{
    char *content = malloc(1024);
    if (!content)
    {
        httpd_resp_send_500(req);
        return NULL;
    }

    int ret = httpd_req_recv(req, content, 1023); // Lê até 1023 bytes
    if (ret <= 0)
    {
        free(content);
        httpd_resp_send_500(req);
        return NULL;
    }
    
    content[ret] = '\0';
    return content;
}