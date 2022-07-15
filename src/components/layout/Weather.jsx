import { useContext, useState, useEffect } from "react";
import WeatherContext from "../WeatherContext";
import cloudy from "../Assets/cloudy.jpg";
import clear from "../Assets/clear.jpg";
import drizzle from "../Assets/drizzle.jpg";
import fog_mist from "../Assets/fog_mist.jpg";
import rainy from "../Assets/rainy.jpg";
import sand from "../Assets/sand.jpg";
import snow from "../Assets/snow.jpg";
import thunderstorm from "../Assets/thunderstorm.jpg";
import Loading from "./Loading";

function Weather() {
  const { loading, weatherData, setLoading, setWeatherData } =
    useContext(WeatherContext);

  const [text, setText] = useState("");
  const [city, setCity] = useState("London");

  const API_KEY = "79cc35345f8949205e012e9e381757b8";

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .catch((err) => alert(err.message))
      .then((data) => setWeatherData(data));

    setLoading(false);
  }, [city, setLoading, setWeatherData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text !== "") {
      setCity(text);
    } else {
      alert("Enter something in the city name");
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  //TODO: background change with the weather according to the id and icons and location

  // destructing weather
  const { weather, main, wind} = weatherData;
  var background;
  //for setting the background

  if(weather){
    const idee = weather[0].id
    if(idee >= 200 && idee <= 232){
      background = thunderstorm;
    }
    else if(idee >= 300 && idee <= 321){
      background = drizzle
    }
    else if(idee >= 500 && idee <= 531){
      background = rainy
    }
    else if(idee >= 600 && idee <= 622){
      background = snow
    }
    else if(idee === 701 || idee === 721 || idee === 741){
      background =  fog_mist
    }
    else if(idee === 800){
      background = clear
    }
    else if(idee >= 801 && idee <= 804){
      background = cloudy
    }
    else if(idee === 751 || idee === 761 || idee === 762){
      background = sand
    }
    else{
      background = clear
    }
  }
  // event listener for the enter keydown 


  

  if (loading) {
    return <Loading />;
  } else if (weatherData) {
    return (
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* top  */}

        <div className="flex flex-between container mx-auto relative">
          {/* weather-details  */}
          <div className="w-2/3 h-screen relative">
            <div className="relative top-10">
              <button className="btn glass rounded">
                <h1 className="text-xl text-white font-semibold prose-h1 lowercase">
                  {" "}
                  Weather
                </h1>
              </button>
            </div>
            <div className="absolute bottom-28">
              <div className="container mx-auto gap-1 ml-20 flex items-center">
                <div className="temp pr-2">
                  <h1 className="text-9xl text-white text-opacity-70">
                    {" "}
                    {main ? `${Math.floor(main.temp)}°` : null}{" "}
                    
                  </h1>
                </div>

                <div className="flex-col pr-4">
                  <div>
                    <h1 className="text-6xl text-white text-opacity-70 h-20">
                      {/* {!text && "Earth"} */}
                      {city}
                    </h1>
                  </div>
                  <div>
                    <h1
                      id="bruh"
                      className="text-white text-opacity-60 text-xl"
                    >
                      Turn the Page 
                    </h1>
                  </div>
                </div>

                <div className="flex-col space-y-3">
                  <div className="rounded-xl bg-cyan-500">
                    <img style={{height: "4.4rem"}} src={weather? `http://openweathermap.org/img/wn/${weather[0].icon}.png` : null} alt="da" />
                  </div>
                  <div>
                    <h1 className="text-white text-opacity-60 text-xl">
                      {weather ? weather[0].main : null}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right blurred side */}
          <div
            className="w-1/3 rounded-l-xl h-screen container bg-black bg-opacity-25"
            style={{ backdropFilter: "blur(8px)" }}
          >
            {/* top search bar*/}
            <div className="container text-center mx-auto w-fit mt-10">
              <div class="form-control">
                <div class="input-group w-full">
                  <input
                    type="text"
                    placeholder="Enter the city"
                    class="input input-bordered input-accent w-96 focus:outline-none"
                    value={text}
                    onChange={handleChange}
                    onKeyDown={(e) => {if(e.key === "Enter"){
                      document.getElementById("myBtn").click()
                    }}}
                  />
                  <button
                    id="myBtn"
                    type="submit"
                    onClick={handleSubmit}
                    class="btn btn-rounded  bg-cyan-500  border-none text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLineCap="round"
                        strokeLineJoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mt-10 mb-10">
              <div
                className="card hover:shadow-lg rounded-lg p-4 cursor-pointer"
                onClick={() => setCity("Copenhagen")}
              >
                <div className="card-title justify-center">
                  <h1 className="text-white text-opacity-70 font-normal">
                    Copenhagen
                  </h1>
                </div>
              </div>
              <div
                className="card hover:shadow-lg rounded-lg p-4 cursor-pointer"
                onClick={() => setCity("Tokyo")}
              >
                <div className="card-title justify-center">
                  <h1 className="text-white text-opacity-70 font-normal">
                    Tokyo
                  </h1>
                </div>
              </div>
              <div
                className="card hover:shadow-lg rounded-lg p-4 cursor-pointer"
                onClick={() => setCity("New York")}
              >
                <div className="card-title justify-center">
                  <h1 className="text-white text-opacity-70 font-normal">
                    New York
                  </h1>
                </div>
              </div>
              <div
                className="card hover:shadow-lg rounded-lg p-4 cursor-pointer"
                onClick={() => setCity("Mumbai")}
              >
                <div className="card-title justify-center">
                  <h1 className="text-white text-opacity-70 font-normal">
                    Mumbai
                  </h1>
                </div>
              </div>
            </div>

            <hr className="text-3xl w-4/5 mx-auto opacity-50" />

            {/* weather details  */}
            <div className="weather-details w-full mt-8">
              <div className="ml-10 w-fit">
                <h1 className="text-white opacity-90 text-xl">
                  {" "}
                  Weather Details
                </h1>
              </div>

              <div className="container mt-5">
                <div className="flex flex-row w-full justify-between px-10 pb-2">
                  <div>
                    <h1 className="text-white opacity-60 font-thin text-lg">
                      {weather ? weather[0].description : null}
                    </h1>
                  </div>
                  <div></div>
                </div>

                <div className="flex flex-row w-full justify-between px-10 pb-2">
                  <div>
                    <h1 className="text-white opacity-60 font-thin text-lg">
                      Pressure
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-white opacity-90">
                      {main ? main.pressure : null}
                    </h1>
                  </div>
                </div>
                <div className="flex flex-row w-full justify-between px-10 pb-2">
                  <div>
                    <h1 className="text-white opacity-60 font-thin text-lg">
                      Wind
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-white opacity-90">
                      {wind ? wind.speed : null}
                    </h1>
                  </div>
                </div>
                <div className="flex flex-row w-full justify-between px-10 pb-2">
                  <div>
                    <h1 className="text-white opacity-60 font-thin text-lg">
                      Humidity
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-white opacity-90">
                      {main ? `${main.humidity}%` : null}
                    </h1>
                  </div>
                </div>
              </div>

              <hr className="text-3xl w-4/5 mx-auto opacity-50 mt-3" />

              {/* temperature section  */}
              <div className="ml-10 w-fit mt-2">
                <h1 className="text-white opacity-90 text-xl"> Temperature</h1>
              </div>

              <div className="stats ml-5  mt-2 bg-black bg-opacity-20 stats-vertical lg:stats-horizontal">
                <div className="stat">
                  <div className="stat-title text-white opacity-70">
                    Min. Temperature
                  </div>
                  <div className="stat-value text-accent text-opacity-70">
                    {main ? `${Math.floor(main.temp_min)}°` : null}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title text-white opacity-70">
                    Max. Temperature
                  </div>
                  <div className="stat-value text-accent text-opacity-70">
                    {main ? `${Math.floor(main.temp_max)}°` : null}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title text-white opacity-70">
                    Feels Like
                  </div>
                  <div className="stat-value text-accent text-opacity-70">
                    {main ? `${Math.floor(main.feels_like)}°` : null}
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full  mt-2 mx-auto badge badge-info badge-outline outline-cyan-500">
              <a href="https://github.com/Blurry-Brush" className="link">Made by Lord Yuwu</a>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <h1>Bruh</h1>;
  }
}

export default Weather;
