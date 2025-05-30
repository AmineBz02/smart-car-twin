
# 🚗 Smart Car Digital Twin

This repository documents a **Digital Twin** system for a smart car. It simulates real-time sensor data using FIWARE Orion Context Broker and visualizes the data through a dashboard interface.

🔗 **[View Deployed Dashboard Here]((https://amine-smart-car-twin.netlify.app/))**


---

## 📖 Project Overview

The project demonstrates how sensor data (speed, battery level, temperature, etc.) can be simulated and sent to a Digital Twin backend. The data is then visualized via a modern dashboard UI.

---

## 🏗️ System Architecture

```

\[Sensor Simulator (VM)] --> \[Orion Context Broker (VM)] --> \[MongoDB (VM)]
|
V
\[Frontend Dashboard (Hosted)]

````

- **Sensor Simulation**: Sends mock car telemetry to Orion.
- **Orion Context Broker**: Receives and manages context data.
- **MongoDB**: Stores data persistently.
- **Dashboard**: Fetches and displays real-time data.

---

## 🧾 Data Model (JSON Example)

```json
{
  "id": "urn:ngsi-ld:SmartCar:001",
  "type": "SmartCar",
  "speed": { "type": "Number", "value": 75 },
  "battery": { "type": "Number", "value": 85 },
  "temperature": { "type": "Number", "value": 28 }
}
````

---

## 🛠️ How to Run Locally (Optional)

To simulate or test locally:

1. Clone this repo.
2. Use `docker-compose up` to start Orion and MongoDB.
3. Run the sensor simulation with Node.js:

   ```bash
   node simulate-sensor.js
   ```
4. Visit the deployed dashboard via the link above.

---

## 📦 Installation Dependencies

* Docker & Docker Compose
* Node.js (for simulation)

---

## 📜 License

MIT License

---

> Created as part of the Digital Twin final project – SUPCOM 2025.



---

