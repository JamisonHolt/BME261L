#include "application.h"
#include "Particle.h"


// Allow offline development by preventing blocking io from WiFi module
SYSTEM_MODE(SEMI_AUTOMATIC);

// Constants
const int BUFFER_SIZE = 512;
const int BAUD_RATE = 9600;

// Forward Declarations (functions)

// Global variables
char inputBuffer[BUFFER_SIZE];

int LED = D7;

void setup() {
  // Set LED pin to output type
  pinMode(LED, OUTPUT);
  // Begin USB serial operations
  Serial.begin(BAUD_RATE);
  // Begin input serial operations (RX pin)
  serial2.begin(BAUD_RATE);
  // Begin output serial operations (TX pin)
  serial2.begin(BAUD_RATE);
}


int data
void loop() {

  // Blink LED
  digitalWrite(LED, HIGH);
  delay(100);
  digitalWrite(LED, LOW);
  delay(100);
}
