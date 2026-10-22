"""
AgriBot Ultrasonic Ground Profiler & Vertical Travel Resolver
Replaces costly IMU drift in open agricultural fields with deterministic ultrasonic ground referencing.
Designed by Er. Vishnu Ramachandra
"""

import time
import math

class UltrasonicGroundProfiler:
    def __init__(self, sensor_baseline_height_mm=250.0):
        self.baseline_height = sensor_baseline_height_mm
        self.calibration_offset = 0.0

    def calculate_depth_mm(self, echo_duration_us):
        # Speed of sound: 343 m/s = 0.343 mm/us
        # Distance = (duration * speed) / 2
        distance_mm = (echo_duration_us * 0.343) / 2.0
        depth_mm = self.baseline_height - distance_mm + self.calibration_offset
        return max(0.0, round(depth_mm, 2))

    def evaluate_ground_slope(self, front_dist_mm, rear_dist_mm, wheelbase_mm=420.0):
        # Computes pitch angle of mobile chassis relative to agricultural terrain
        delta_h = front_dist_mm - rear_dist_mm
        pitch_rad = math.atan2(delta_h, wheelbase_mm)
        pitch_deg = math.degrees(pitch_rad)
        return round(pitch_deg, 2)

if __name__ == "__main__":
    profiler = UltrasonicGroundProfiler()
    test_echo = 700 # ~120mm distance
    depth = profiler.calculate_depth_mm(test_echo)
    print(f"[PROFILER TEST] Echo: {test_echo}us -> Computed Cavity Depth: {depth} mm")
    pitch = profiler.evaluate_ground_slope(front_dist_mm=240, rear_dist_mm=255)
    print(f"[CHASSIS ATTITUDE] Terrain pitch: {pitch} degrees")
