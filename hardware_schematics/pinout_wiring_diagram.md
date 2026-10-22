# AgriBot Electrical Wiring & Pinout Architecture
### **Raspberry Pi Pico & ESP32-CAM Dual-Core Mechatronics Interconnect**

```
+-------------------------------------------------------------+
|                      12V LiFePO4 BATTERY (7.2Ah)            |
+------------------------------+------------------------------+
                               |
            +------------------+------------------+
            | 12V High-Current Bus                | LM2596 Buck (5V 3A)
            v                                     v
     [BTS7960 Driver]                     [Pico & ESP32-CAM Bus]
            |                                     |
   +--------+--------+                 +----------+----------+
   |                 |                 |                     |
[Johnson Motor] [4x DC Motors]     [Raspberry Pi Pico] [ESP32-CAM]
```

### Raspberry Pi Pico GPIO Pinout Map:
| Pin | Function | Peripheral / Connection |
| :---: | :--- | :--- |
| **GP14** | Input (Pull-Up) | Upper Vertical Travel Limit Switch |
| **GP15** | Input (Pull-Up) | Lower Vertical Travel Limit Switch |
| **GP16** | PWM Output | Vertical Drill Spindle Speed (Johnson Motor) |
| **GP17** | Digital Out | Drill Direction IN1 |
| **GP18** | Digital Out | Drill Direction IN2 |
| **GP19** | PWM Output | Lead-Screw Vertical Translation Feed Speed |
| **GP20** | Digital Out | Lead-Screw Direction IN3 |
| **GP21** | Digital Out | Lead-Screw Direction IN4 |
| **GP26** | ADC Input (ADC0)| ACS712 / Current Sense Resistor (Stall Detection) |
| **GP0**  | UART0 TX | Serial Telemetry to ESP32-CAM (Rx GPIO 3) |
| **GP1**  | UART0 RX | Serial Telemetry from ESP32-CAM (Tx GPIO 1) |
