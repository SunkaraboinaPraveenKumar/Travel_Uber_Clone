"use client"
import GoogleMapSection from "@/components/GoogleMapSection";
import SearchSection from "@/components/SearchSection";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import { LoadScript } from "@react-google-maps/api";
import { useState } from "react";

export default function Home() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        libraries={['places']}
        >
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
            <div>
              {/* Search */}
              <SearchSection />
            </div>
            <div className="col-span-2 mt-5">
              {/* Google Map */}
              <GoogleMapSection />
            </div>
          </div>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
