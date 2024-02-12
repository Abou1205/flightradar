import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const state = useSelector((store) => store.flightSlice);

  console.log(state);

  return (
    <header>
      <div>
        <img src="./plane-l.png" />
        <h3>Flight Radar</h3>
      </div>

      <p>
        {state.isLoading
          ? "Finding Flights..."
          : state.isError
          ? "Error occured"
          : state.flights.length + " flights detected"}
      </p>
    </header>
  );
};

export default Header;
