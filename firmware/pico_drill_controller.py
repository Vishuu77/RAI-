"""
AgriBot 6-DOF Mobile Robot - Raspberry Pi Pico Firmware
Lead Robotics Architect: Er. Vishnu Ramachandra (VTU Rank 10)
Student Research Project Programme (SRPP 2025-26) Grant Project
"""

import machine
import time

class AgriBotDrillController:
    def __init__(self):
        # Johnson High-Torque Motor PWM & Direction Pins (Vertical Drill)
        self.drill_pwm = machine.PWM(machine.Pin(16))
        self.drill_pwm.freq(1000)
        self.drill_dir1 = machine.Pin(17, machine.Pin.OUT)
        self.drill_dir2 = machine.Pin(18, machine.Pin.OUT)

        # Lead-Screw Vertical Translation Actuator
        self.leadscrew_pwm = machine.PWM(machine.Pin(19))
        self.leadscrew_pwm.freq(1000)
        self.leadscrew_dir1 = machine.Pin(20, machine.Pin.OUT)
        self.leadscrew_dir2 = machine.Pin(21, machine.Pin.OUT)

        # Limit Switches (Travel Bounds)
        self.limit_upper = machine.Pin(14, machine.Pin.IN, machine.Pin.PULL_UP)
        self.limit_lower = machine.Pin(15, machine.Pin.IN, machine.Pin.PULL_UP)

        # Closed-Loop Current Sensing (Stall Protection via ADC)
        self.current_sensor = machine.ADC(26) # GP26 / ADC0
        self.CURRENT_STALL_THRESHOLD_VOLTS = 2.45 # ~12A motor stall threshold

        self.stop_all()
        print("[AGRIBOT PICO] Drill Controller Initialized successfully.")

    def stop_all(self):
        self.drill_pwm.duty_u16(0)
        self.drill_dir1.value(0)
        self.drill_dir2.value(0)
        self.leadscrew_pwm.duty_u16(0)
        self.leadscrew_dir1.value(0)
        self.leadscrew_dir2.value(0)

    def read_current_draw(self):
        # 16-bit ADC reading scaled to 3.3V reference
        val = self.current_sensor.read_u16()
        return (val / 65535.0) * 3.3

    def drill_down(self, target_depth_mm, feed_speed_pct=60):
        print(f"[AGRIBOT] Starting drilling sequence to target depth: {target_depth_mm} mm")
        # Spin up Johnson drill motor (Clockwise)
        self.drill_dir1.value(1)
        self.drill_dir2.value(0)
        self.drill_pwm.duty_u16(int(65535 * 0.90)) # 90% torque duty cycle
        time.sleep(0.5)

        # Feed lead screw downwards
        duty = int(65535 * (feed_speed_pct / 100.0))
        self.leadscrew_dir1.value(1)
        self.leadscrew_dir2.value(0)
        self.leadscrew_pwm.duty_u16(duty)

        start_time = time.time()
        max_duration_sec = 25 # Safety timeout

        while time.time() - start_time < max_duration_sec:
            # Check bottom limit switch
            if self.limit_lower.value() == 0:
                print("[AGRIBOT] Lower limit switch triggered. Reached maximum travel.")
                break

            # Check closed-loop current stall
            v = self.read_current_draw()
            if v > self.CURRENT_STALL_THRESHOLD_VOLTS:
                print(f"[AGRIBOT WARNING] High motor torque detected ({v:.2f}V). Retracting drill 5mm to clear root/rock.")
                self.peck_drill_retract()

            time.sleep(0.05)

        self.leadscrew_pwm.duty_u16(0)
        self.drill_pwm.duty_u16(0)
        print("[AGRIBOT] Soil cavity prepared. Retracting to home position.")
        self.retract_to_home()

    def peck_drill_retract(self):
        # Reverse lead screw upwards for 0.4s to relieve torque
        self.leadscrew_dir1.value(0)
        self.leadscrew_dir2.value(1)
        self.leadscrew_pwm.duty_u16(40000)
        time.sleep(0.4)
        # Resume forward feed
        self.leadscrew_dir1.value(1)
        self.leadscrew_dir2.value(0)
        self.leadscrew_pwm.duty_u16(35000)

    def retract_to_home(self):
        self.leadscrew_dir1.value(0)
        self.leadscrew_dir2.value(1)
        self.leadscrew_pwm.duty_u16(int(65535 * 0.85))

        while self.limit_upper.value() != 0:
            time.sleep(0.02)

        self.stop_all()
        print("[AGRIBOT] Carriage docked at upper limit switch. Safe.")

if __name__ == "__main__":
    bot = AgriBotDrillController()
    bot.drill_down(target_depth_mm=150)
