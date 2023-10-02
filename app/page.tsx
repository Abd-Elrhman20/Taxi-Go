"use client"
import Booking from "@/components/Booking/Booking";
import MapBox from "@/components/Map/MapBox";
import { UserLocationContext } from "@/context/UserLocationContext";
import { DestinationCoordinatesContext } from "@/context/DestinationCoordinatesContext";
import { SourceCoordinatesContext } from "@/context/SourceCoordinatesContext";
import { useEffect, useState } from "react";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmount";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>()

  const [sourceCoordinates, setSourceCoordinates] = useState<any>()
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>()
  const [directionData, setDirectionData] = useState<any>()
  const [carAmount, setCarAmount] = useState<any>()



  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log(position.coords);
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }

  useEffect(() => {
    getUserLocation()
  }, [])

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      <SourceCoordinatesContext.Provider value={{ sourceCoordinates, setSourceCoordinates }}>
        <DestinationCoordinatesContext.Provider value={{ destinationCoordinates, setDestinationCoordinates }}>
          <DirectionDataContext.Provider value={{ directionData, setDirectionData }}>
            <SelectedCarAmountContext.Provider value={{ carAmount, setCarAmount }}>
              <div className='container-fluid'>
                <div className="row">
                  <div className="col-md-4"> <Booking /> </div>
                  <div className="col-md-8"> <MapBox /> </div>
                </div>
              </div>
            </SelectedCarAmountContext.Provider>
          </DirectionDataContext.Provider>
        </DestinationCoordinatesContext.Provider>
      </SourceCoordinatesContext.Provider>
    </UserLocationContext.Provider>
  )
}

