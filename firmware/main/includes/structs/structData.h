#include "../server.h"

typedef struct
{
   char *rcv;
   httpd_req_t *req;
} arg_t;