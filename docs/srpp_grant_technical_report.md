# Student Research Project Programme (SRPP 2025–26) Grant Technical Report
### **AgriBot — 6-DOF Agricultural Mobile Robot**
**Principal Student Researcher & Lead Architect:** Er. Vishnu Ramachandra  
**Department:** Robotics & Artificial Intelligence Engineering  
**Academic Rank:** 10th University Rank across Visvesvaraya Technological University (VTU), 9.11 CGPA Honours  
**Grant Program:** Student Research Project Programme (SRPP 2025–26) Seed Funding  
**Distinction:** Honored at 59th Engineers' Day by The Institution of Engineers (India) - Karnataka State Centre  

---

## 1. Abstract
Manual sapling plantation in rural Indian agriculture is severely constrained by labor shortages, ergonomic strain, and inconsistent vertical soil penetration depths that impair crop root establishment. AgriBot is a grant-funded 6-Degree-of-Freedom autonomous mobile robot engineered to automate soil depth profiling, precision vertical drilling, and automated sapling placement.

## 2. Key Mechatronic Innovations
- **Elimination of Costly IMU Drift:** Replaced expensive RTK-GPS/IMU combinations with an array of downward ultrasonic profiling sensors paired with an ESP32-CAM visual orientation feed.
- **Closed-Loop Torque Feedback:** Built-in current monitoring dynamically detects subterranean rocks and impenetrable root networks, automatically executing peck-drilling retract cycles to protect motor windings.
- **Agentic Firmware Generation:** Critical motor sequence routines were generated and iteratively validated through an LLM agentic architecture for deterministic fail-safe behavior.
