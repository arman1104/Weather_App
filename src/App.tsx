import WeatherContent from "./components/WeatherContent";

const App = () => {
  return (
    <div className="min-h-screen bg-[hsl(243,96%,9%)] text-white">
      <div className="mb-10">
        <WeatherContent />
      </div>
    </div>
  );
};

export default App;
