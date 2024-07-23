"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { googlrApiKey } from "@/lib/googleApi";

interface GoogleMapsProps {
  position: { lat: number; lng: number };
  location: string;
}

export default function GoogleMaps({ position, location }: GoogleMapsProps) {
  //   const position = { lat: 53.54, lng: 10 };
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={googlrApiKey}>
      <div style={{ height: "100%", width: "100%" }}>
        <Map
          defaultZoom={12}
          defaultCenter={position}
          mapId={"aa21e74a7cd52a60"}
        >
          <AdvancedMarker
            position={position}
            onClick={() => setOpen(true)}
          ></AdvancedMarker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>Come visit us on {location}</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
