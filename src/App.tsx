// import React from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <div>
      {/* <h1 className="font-bricolage text-4xl font-semibold">
        How’s the sky looking today?
      </h1>
      <input className="font-sans text-sm" />
      <button className="font-sans text-sm font-medium">Search</button>
      <p className="font-sans text-lg font-medium">Berlin, Germany</p>
      <div className="font-bricolage text-6xl font-bold">20°</div>
      <p className="font-sans text-xs text-gray-400">Humidity</p> */}
      <Header />
      <div className="text-center">
        <h1 className="font-bricolage text-5xl font-semibold">
          How’s the sky looking today?
        </h1>
      </div>
      <SearchBar />
    </div>
  );
};

export default App;
