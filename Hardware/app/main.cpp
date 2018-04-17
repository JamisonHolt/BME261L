#include "application.h"
#include "Adafruit/src/MCP9808.h"

// Allow offline development by preventing blocking io from WiFi module
SYSTEM_MODE(MANUAL);

// Create the MCP9808 temperature sensor object
MCP9808 tempSensor = MCP9808();

// Constants
const int BAUD_RATE = 9600;
const int LED = D7;

// Globals
int LED_State = 1;
float prevTemp = 0;

// Setup our device
void setup() {
    // Set LED pin to output type
    pinMode(LED, OUTPUT);

    // Make sure temperature sensor is found
    while (!tempSensor.begin()) {
        delay(500);
        LED_State ^= 1;
    }

    // Set resolution to the maximum (slowest conversion)
    tempSensor.setResolution(MCP9808_SLOWEST);

    // Begin output serial operations (TX pin)
    Serial1.begin(BAUD_RATE);
}

void loop() {
    // Only send changes in temperature and poll as quickly as possible
    float newTemp = tempSensor.getTemperature() * 9.0 / 5.0 + 32;
    if (newTemp != prevTemp) {
        LED_State ^= 1;
        digitalWrite(LED, LED_State);
        Serial1.println(newTemp);
        prevTemp = newTemp;
    }
}
