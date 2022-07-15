import React from "react";
import Weather from "./components/layout/Weather";
import { WeatherProvider } from "./components/WeatherContext";

function App() {
  return (
    <WeatherProvider>

    <div>
        <Weather />
    </div>
    </WeatherProvider>
  );
}

export default App;
