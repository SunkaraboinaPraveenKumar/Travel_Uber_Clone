"use client";
import React, { useContext, useEffect, useState } from "react";
import InputItem from "./InputItem";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import CarListOptions from "./CarListOptions";

function SearchSection() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const [distance, setDistance] = useState(null);

  const calculateDistance = () => {
    if (source && source.lat && source.lng && destination && destination.lat && destination.lng) {
      const dist = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(source.lat, source.lng),
        new google.maps.LatLng(destination.lat, destination.lng)
      );

      const distInKM = dist / 1000;
      setDistance(distInKM);
    } else {
      console.error("Invalid source or destination coordinates");
    }
  };

  useEffect(() => {
    if (source) {
      console.log("Source:", source);
    }
    if (destination) {
      console.log("Destination:", destination);
    }
  }, [source, destination]);

  return (
    <div>
      <div className="p-2 md:p-6 border-[2px] rounded-xl">
        <p className="text-[20px] font-bold">Get a ride</p>
        <InputItem type="source" />
        <InputItem type="destination" />
        <button
          onClick={() => calculateDistance()}
          className="p-3 bg-black w-full mt-5 text-white rounded-lg"
        >
          Search
        </button>
      </div>
      {distance ? <CarListOptions distance={distance} /> : null}
    </div>
  );
}

export default SearchSection;
