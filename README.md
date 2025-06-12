


# 🚗 Smart Car Digital Twin Dashboard

A modern, real-time dashboard for monitoring a smart vehicle using data from a **FIWARE Orion Context Broker**. The interface features gauges, indicators, and maps to visualize vehicle metrics with auto-refresh and fallback simulation when offline.

## 🌐 Live Demo

👉 [Live on Netlify](https://amine-smart-car-twin.netlify.app/)

---

## 🧩 Features

- 🔄 Real-time data fetching from Orion Context Broker every 10 seconds
- 📍 GPS location displayed on an interactive map
- ⚙️ Configurable IP address for Orion Context Broker
- ⛽ Animated **Fuel Gauge**
- 🌡️ Color-coded **Engine Temperature** display
- 🚀 Dynamic **Speedometer** with smooth animations
- 💡 Offline Mode: Sensor simulation when broker is unreachable
- 🎨 Responsive and dark-mode UI with modern design

---

## 📦 Project Structure

```

├── package.json
├── index.html
├── src/
│   ├── index.css
│   ├── App.tsx
│   ├── types/
│   │   └── VehicleData.ts
│   ├── hooks/
│   │   ├── useVehicleData.ts
│   │   └── useSimulatedData.ts
│   ├── components/
│   │   ├── ConfigForm.tsx
│   │   ├── Speedometer.tsx
│   │   ├── FuelGauge.tsx
│   │   ├── TemperatureIndicator.tsx
│   │   ├── LocationMap.tsx
│   │   └── Dashboard.tsx

````

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AmineBz02/smart-car-twin.git
cd smart-car-twin
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Configuration

On first load, the dashboard prompts you to enter the IP address of your **Orion Context Broker** (e.g., `192.168.1.100`). The IP is stored in local storage and automatically used to fetch data.

**API Endpoint Example:**

```
http://<IP_ADDRESS>:1026/v2/entities/urn:ngsi-ld:Vehicle:001
```

---

## 🧪 Sensor Simulation Mode

If the Orion Context Broker is unreachable or not configured, the dashboard falls back to **realistic simulated data**, including:

* Random but smooth speed fluctuations
* Gradual fuel decrease
* Temperature oscillation
* Moving GPS coordinates (around London)

A banner appears when simulated data is being used.

---

## 📡 Vehicle Data Attributes

| Attribute     | Type    | Unit    | Description              |
| ------------- | ------- | ------- | ------------------------ |
| `speed`       | Number  | km/h    | Current speed            |
| `engineTemp`  | Number  | °C      | Engine temperature       |
| `fuelLevel`   | Number  | %       | Fuel remaining           |
| `gpsLocation` | GeoJSON | lat/lng | Current vehicle location |

---

## 🖼️ Visual Components

* `Speedometer`: Circular gauge with speed value
* `TemperatureIndicator`: Numeric display with colored range
* `FuelGauge`: Horizontal/vertical fuel level bar
* `LocationMap`: Map with live vehicle marker
* `ConfigForm`: Set Orion Broker IP
* `Dashboard`: Composed layout of all widgets

---

## 🚀 Deployment

You can deploy this app using [Netlify](https://netlify.com), Vercel, or GitHub Pages.

### ✅ Netlify Deployment Steps

1. Push to GitHub
2. Link your repo in Netlify
3. Set **Build Command**: `npm run build`
4. Set **Publish Directory**: `dist/`
5. Deploy!

Live Example: [amine-smart-car-twin.netlify.app](https://amine-smart-car-twin.netlify.app/)

---

## 🧠 Credits

Built with ❤️ using React + TypeScript, styled for clarity and readability.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

```


```

