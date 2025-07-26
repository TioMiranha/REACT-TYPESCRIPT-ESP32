#include "server.h"

extern char led1_status[4];
extern char led2_status[4];

#define LED_STATUS 2
#define LED1 32
#define LED2 33

char *stateLed(arg_t *args);
void selectControl(const char *led, const char *acao);