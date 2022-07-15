import { createContext, useState } from "react";
const WeatherContext = createContext();

const API_KEY = "79cc35345f8949205e012e9e381757b8";

export const WeatherProvider = ({ children }) => {
  
  const [loading,setLoading] = useState(false)
  const [weatherData,setWeatherData] = useState({});


  const getWeather = async (city) => {
    setLoading(true);
    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    if(response.status >= 400 && response.status < 500){
        alert('messed up ');
    }
    else{

      const data = await response.json();
      
      setWeatherData(data)
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        loading,
        weatherData,
        getWeather,
        setLoading,
        setWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;

