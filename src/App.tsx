// import Header from "./components/Header";
// import SearchBar from "./components/SearchBar";
// import WeatherCard from "./components/WeatherCard";
// import WeatherStatCard from "./components/WeatherStatCard";
// import HourlyForecast from "./components/HourlyForecast";
// import DailyForecast from "./components/DailyForecast";
// import { useWeather } from "./context/WeatherContext";
// import errorIcon from "./assets/images/icon-error.svg";
// import retryIcon from "./assets/images/icon-retry.svg";

// const App = () => {
//   const { currentWeather, error, retry } = useWeather();

//   return (
//     <div className="min-h-screen bg-[hsl(243,96%,9%)] text-white">
//       <Header />

//       <div className="text-center mt-8 px-4">
//         <h1 className="font-bricolage text-4xl md:text-5xl font-semibold">
//           How's the sky looking today?
//         </h1>
//       </div>

//       <SearchBar />

//       {/* Error State */}
//       {error && !currentWeather && (
//         <div className="flex flex-col items-center justify-center min-h-[400px] max-w-7xl mx-auto px-4 mt-12">
//           <img
//             src={errorIcon}
//             alt="error"
//             className="h-24 w-24 mb-6 opacity-80"
//           />
//           <h2 className="text-2xl font-bold font-bricolage mb-2">
//             Something went wrong
//           </h2>
//           <p className="text-gray-400 font-sans mb-6 text-center max-w-md">
//             {error === "No search result found!"
//               ? "We couldn't find that location. Please try searching for another place."
//               : "We couldn't connect to the server (API error). Please try again in a few moments."}
//           </p>
//           <button
//             onClick={retry}
//             className="flex items-center gap-2 rounded-lg bg-white/15 px-6 py-3 text-sm font-medium text-white hover:bg-white/20 transition backdrop-blur-md"
//           >
//             <img src={retryIcon} alt="retry" className="h-4 w-4" />
//             <span className="font-sans">Retry</span>
//           </button>
//         </div>
//       )}

//       {/* Main Content */}
//       {!error && (
//         <div className="flex flex-col lg:flex-row gap-8 mt-8">
//           {/* LEFT */}
//           <div className="flex-1 space-y-6">
//             <WeatherCard />

//             {currentWeather && (
//               <div className="flex flex-wrap md:flex-nowrap gap-2">
//                 <div className="flex-1 min-w-[120px]">
//                   <WeatherStatCard
//                     label="Feels Like"
//                     value={currentWeather.feelsLike}
//                     type="temperature"
//                   />
//                 </div>

//                 <div className="flex-1 min-w-[120px]">
//                   <WeatherStatCard
//                     label="Humidity"
//                     value={currentWeather.humidity}
//                     type="humidity"
//                   />
//                 </div>

//                 <div className="flex-1 min-w-[120px]">
//                   <WeatherStatCard
//                     label="Wind"
//                     value={currentWeather.windSpeed}
//                     type="wind"
//                   />
//                 </div>

//                 <div className="flex-1 min-w-[120px]">
//                   <WeatherStatCard
//                     label="Precipitation"
//                     value={currentWeather.precipitation}
//                     type="precipitation"
//                   />
//                 </div>
//               </div>
//             )}

//             <DailyForecast />
//           </div>

//           {/* RIGHT */}
//           <div className="w-full lg:w-80 mt-10">
//             <HourlyForecast />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

import Header from "./components/Header";
import WeatherContent from "./components/WeatherContent";

const App = () => {
  return (
    <div className="min-h-screen bg-[hsl(243,96%,9%)] text-white">
      {/* <Header /> */}
      <WeatherContent />
    </div>
  );
};

export default App;
