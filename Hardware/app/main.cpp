#include "application.h"
#include "Adafruit/src/MCP9808.h"
// Allow offline development by preventing blocking io from WiFi module
SYSTEM_MODE(SEMI_AUTOMATIC);
// Create the MCP9808 temperature sensor object
MCP9808 tempSensor = MCP9808();
// Constants
const int BAUD_RATE = 9600;
const int LED = D7;
// Globals
int LED_State = 1;
float fahrenheit;

void setup() {
  // Set LED pin to output type
  pinMode(LED, OUTPUT);
  // Begin USB serial operations
  Serial.begin(BAUD_RATE);
  delay(5000);
  // Make sure temperature sensor is found
  Serial.println("Attempting to connect to tempSensor");
  while (!tempSensor.begin()) {
	    Serial.println("MCP9808 not found");
	    delay(500);
	}
  // Set resolution to the maximum (slowest conversion)
	tempSensor.setResolution(MCP9808_SLOWEST);
	Serial.println("MCP9808 OK");
  // Begin output serial operations (TX pin)
  Serial1.begin(BAUD_RATE);
}

void loop() {
  digitalWrite(LED, LED_State);
  LED_State ^= 1;
  fahrenheit = tempSensor.getTemperature() * 9.0 / 5.0 + 32;
  Serial.println(fahrenheit);
  Serial1.println(fahrenheit);
	delay(250);
}
