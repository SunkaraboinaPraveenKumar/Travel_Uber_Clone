"use client"
import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, MarkerF, OverlayViewF, OverlayView, DirectionsRenderer } from '@react-google-maps/api';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';

function GoogleMapSection() {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  const containerStyle = {
    width: '100%',
    height: window.innerWidth * 0.45,
  };

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  useEffect(() => {
    if (source && source.lat && source.lng && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }
    if (source && destination) {
      directionRoute();
    }
  }, [source]);

  useEffect(() => {
    if (destination && destination.lat && destination.lng && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }
    if (source && destination) {
      directionRoute();
    }
  }, [destination]);

  const [map, setMap] = useState(null);
  const [directionRoutePoints, setDirectionRoutePoints] = useState(null);  // Initialize as null

  const onLoad = (map) => {
    if (window.google) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
    }
  };

  const onUnmount = (map) => {
    setMap(null);
  };

  const directionRoute = () => {
    const directionService = new google.maps.DirectionsService();

    directionService.route({
      origin: { lat: source.lat, lng: source.lng },
      destination: { lat: destination.lat, lng: destination.lng },
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === 'OK') {
        setDirectionRoutePoints(result);  // Set the entire result, not just points
      } else {
        console.log('Error: ', status);
      }
    });
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {source && source.lat && source.lng && (
        <MarkerF
          icon={{
            url: '/location.png',
            scaledSize: {
              width: 20,
              height: 20
            }
          }}
          position={{ lat: source.lat, lng: source.lng }}>
          <OverlayViewF
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className='p-2 bg-white font-bold inline-block'>
              <p className='text-black text-[15px]'>{source.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      )}
      {destination && destination.lat && destination.lng && (
        <MarkerF
          icon={{
            url: '/location.png',
            scaledSize: {
              width: 25,
              height: 25
            }
          }}
          position={{ lat: destination.lat, lng: destination.lng }}>

          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className='p-1 bg-white font-bold inline-block'>
              <p className='text-black text-[15px]'>{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      )}

      {directionRoutePoints && (
        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            suppressMarkers:true,
            polylineOptions: {
              strokeColor: '#000',
              strokeOpacity: 0.7,
              strokeWeight: 5,
            }
          }}
        />
      )}
    </GoogleMap>
  );
}

export default GoogleMapSection;
