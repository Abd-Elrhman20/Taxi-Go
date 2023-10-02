import React, { useContext } from 'react'
import { Marker } from 'react-map-gl'
import { UserLocationContext } from '@/context/UserLocationContext'
import { useUser } from '@clerk/nextjs';
import { SourceCoordinatesContext } from '@/context/SourceCoordinatesContext';
import { DestinationCoordinatesContext } from '@/context/DestinationCoordinatesContext';


const Markers = () => {
    const { userLocation, setUserLocation } = useContext(UserLocationContext)
    const { isSignedIn, user } = useUser();

    const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCoordinatesContext)
    const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCoordinatesContext)

    return (
        <div>
            {/* User Marker  */}
            <Marker longitude={userLocation?.lng} latitude={userLocation?.lat} anchor="bottom" >
                {isSignedIn ? <img className='w-10 h-10 rounded-full' style={{ filter: "drop-shadow(2px 2px 6px orange)", border: "1px black solid" }} src={user.imageUrl} /> : ""}
            </Marker>

            {/* Source Marker  */}
            {sourceCoordinates ? <Marker longitude={sourceCoordinates?.lng} latitude={sourceCoordinates?.lat} anchor="bottom" >
                {isSignedIn ? <img className='w-10 h-10 rounded-full' src='/location.png' /> : ""}
            </Marker> : ""}

            {/* Destination Marker  */}
            {destinationCoordinates ? <Marker longitude={destinationCoordinates?.lng} latitude={destinationCoordinates?.lat} anchor="bottom">
                {isSignedIn ? <img className='w-10 h-10 rounded-full' src='/location.png' /> : ""}
            </Marker> : ""}
        </div>
    )
}

export default Markers