#include "application.h"

// Allow offline development by preventing blocking io from WiFi module
SYSTEM_MODE(SEMI_AUTOMATIC);
int LED = D7;

void setup() {
  // Set LED pin to output type
  pinMode(LED, OUTPUT);
}

void loop() {
  // Blink LED
  digitalWrite(LED, HIGH);
  delay(100);
  digitalWrite(LED, LOW);
  delay(100);
}
