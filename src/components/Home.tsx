import { useWeather } from "../context/WeatherContext";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import WeatherStatCard from "./WeatherStatCard";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import errorIcon from "../assets/images/icon-error.svg";
import retryIcon from "../assets/images/icon-retry.svg";
import Header from "./Header";

const Home = () => {
  const { currentWeather, error, retry } = useWeather();

  return (
    <>
      {/* Title */}
      <div className="text-center mt-6 px-4">
        {/* <Header /> */}
        <Header />
        <h1 className="font-bricolage text-4xl md:text-5xl font-semibold">
          How&apos;s the sky looking today?
        </h1>
      </div>

      <SearchBar />

      {/* ERROR STATE */}

      {/* NO SEARCH RESULT  */}
      {error === "No search result found!" && (
        <p className="mt-6 text-center text-lg text-gray-200 font-sans">
          No search result found!
        </p>
      )}

      {/* API ERROR  */}
      {error && error !== "No search result found!" && !currentWeather && (
        <div className="flex flex-col items-center justify-center max-w-6xl mx-auto px-4 mt-10">
          <img
            src={errorIcon}
            alt="error"
            className="h-12 w-12 mb-6 opacity-80"
          />
          <h2 className="text-2xl font-bold font-bricolage mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-400 font-sans mb-6 text-center max-w-md">
            We couldn't connect to the server. Please try again later.
          </p>
          <button
            onClick={retry}
            className="flex items-center gap-2 rounded-lg bg-white/15 px-6 py-3 text-sm font-medium text-white hover:bg-white/20 transition backdrop-blur-md"
          >
            <img src={retryIcon} alt="retry" className="h-4 w-4" />
            Retry
          </button>
        </div>
      )}

      {/* MAIN CONTENT */}
      {!error && (
        <div className="max-w-6xl mx-auto px-2 mt-8 flex flex-col lg:flex-row gap-6">
          {/* LEFT */}
          <div className="flex-1 space-y-6 px-1">
            <WeatherCard />

            {currentWeather && (
              <div className="flex flex-wrap gap-3">
                <div className="w-[calc(50%-0.375rem)] md:flex-1">
                  <WeatherStatCard
                    label="Feels Like"
                    value={currentWeather.feelsLike}
                    type="temperature"
                  />
                </div>

                <div className="w-[calc(50%-0.375rem)] md:flex-1">
                  <WeatherStatCard
                    label="Humidity"
                    value={currentWeather.humidity}
                    type="humidity"
                  />
                </div>

                <div className="w-[calc(50%-0.375rem)] md:flex-1">
                  <WeatherStatCard
                    label="Wind"
                    value={currentWeather.windSpeed}
                    type="wind"
                  />
                </div>

                <div className="w-[calc(50%-0.375rem)] md:flex-1">
                  <WeatherStatCard
                    label="Precipitation"
                    value={currentWeather.precipitation}
                    type="precipitation"
                  />
                </div>
              </div>
            )}

            <DailyForecast />
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-80">
            <HourlyForecast />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
