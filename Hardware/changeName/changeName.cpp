#include "application.h"
// Allow offline development by preventing blocking io from WiFi module
SYSTEM_MODE(MANUAL);
// Constants
const int BAUD_RATE = 9600;

void setup() {
    // Begin output serial operations (TX pin)
    Serial1.begin(BAUD_RATE);
    Serial1.print("AT");
    delay(1000);
    Serial1.print("AT+NAMEThermActive");
    delay(1000);
    Serial1.print("AT+PIN42069");
}
//
// void loop() {
//   delay(1000);
// }
