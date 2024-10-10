"use client";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    setPlaceholder(type === 'source' ? 'Pickup Location' : 'Dropoff Location');
  }, [type]);

  const getLatAndLang = (place, type) => {
    const placeId = place?.value?.place_id;

    if (!placeId) {
      console.error("Invalid place ID");
      return;
    }

    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails({ placeId }, (placeDetails, status) => {
      if (status === 'OK' && placeDetails.geometry && placeDetails.geometry.location) {
        const lat = placeDetails.geometry.location.lat();
        const lng = placeDetails.geometry.location.lng();

        if (type === 'source') {
          setSource({
            lat,
            lng,
            name: placeDetails.formatted_address,
            label: placeDetails.name
          });
        } else {
          setDestination({
            lat,
            lng,
            name: placeDetails.formatted_address,
            label: placeDetails.name
          });
        }
      } else {
        console.error('Error fetching place details:', status);
      }
    });
  };

  return (
    <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
      <Image src={'/location.png'} width={15} height={15} alt='input' />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          value,
          onChange: (place) => { 
            if (place) {
              getLatAndLang(place, type); 
              setValue(place);
            }
          },
          placeholder: placeholder,
          isClearable: true,
          className: 'w-full',
          components: {
            DropdownIndicator: false
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: '#00ffff00',
              border: 'none'
            }),
          }
        }}
      />
    </div>
  );
}

export default InputItem;
