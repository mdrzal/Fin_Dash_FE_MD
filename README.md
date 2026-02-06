# Financial Analysis Frontend

## Overview
The Financial Analysis Frontend is an interactive dashboard designed for financial and stock analysis. This application is paired with the backend system alongside the backend system

## Features
- **Interactive Charts:** Visualize stock prices, recommendations, and sentiment using Chart.js.
- **Financial Metrics:** Analyze core metrics, trend metrics, correlation metrics, and more.
- **News Integration:** Browse recent news articles related to selected stocks and track media sentiment.

## Tech Stack
- **Frontend Framework:** Vue 3 (Composition API, `<script setup>`)
- **State Management:** Pinia (with persisted state)
- **Styling:** Tailwind CSS, Bootstrap
- **Charts:** Chart.js
- **HTTP Client:** Axios
- **Build Tool:** Vite

## Project Structure
```
public/
  images/          # Static assets
src/
  assets/          # Global styles and assets
  components/      # Reusable Vue components
  models/          # TypeScript interfaces and enums
  network/         # API service layer
  router/          # Vue Router setup
  services/        # Utility services (e.g., notifications)
  stores/          # Pinia stores for state management
  views/           # Page-level components
```

## Acknowledgments
- [Vue.js](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- [Axios](https://axios-http.com/)

## Running the Frontend with Docker

### Prerequisites
- Ensure Docker is installed and running on your system.
- The backend system should also be running. Follow the instructions in the backend README to set it up.

### Steps
1. Build the Docker image for the frontend:
   ```bash
   docker-compose build
   ```
2. Run the Docker container:
   ```bash
   docker-compose up
   ```
3. Access the application at:
   ```
   http://localhost:3000
   ```

### Running with the Backend
To pair the frontend with the backend:
- See instructions in the [Financial Analysis Backend README](https://github.com/mdrzal/Fin_Dash_BE_MD).
