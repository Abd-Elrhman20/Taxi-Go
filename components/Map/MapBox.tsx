"use client"
import { UserLocationContext } from '@/context/UserLocationContext';
import React, { useContext, useEffect, useRef } from 'react'
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from './Markers';
import { SourceCoordinatesContext } from '@/context/SourceCoordinatesContext';
import { DestinationCoordinatesContext } from '@/context/DestinationCoordinatesContext';
import axios from 'axios';
import { DirectionDataContext } from '@/context/DirectionDataContext';
import MapBoxRoute from './MapBoxRoute';
import DistanceTime from './DistanceTime';
// import { useUser } from '@clerk/nextjs';

const MapBox = () => {
    // get user location from context
    const { userLocation, setUserLocation } = useContext(UserLocationContext)

    const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCoordinatesContext)
    const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCoordinatesContext)
    const { directionData, setDirectionData } = useContext(DirectionDataContext)

    const mapRef = useRef<any>(null)

    // use to fly to Source location
    useEffect(() => {
        if (sourceCoordinates) {
            mapRef.current?.flyTo({
                center: [sourceCoordinates.lng, sourceCoordinates.lat],
                duration: 2500,
                zoom: 14
            })
        }
    }, [sourceCoordinates])

    // use to fly to Destination location
    useEffect(() => {
        if (destinationCoordinates) {
            mapRef.current?.flyTo({
                center: [destinationCoordinates.lng, destinationCoordinates.lat],
                duration: 2500,
                zoom: 14
            })
        }

        if (sourceCoordinates && destinationCoordinates) {
            getDirectionRoute()
        }
    }, [destinationCoordinates])

    const getDirectionRoute = async () => {
        const res = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${sourceCoordinates.lng},${sourceCoordinates.lat};${destinationCoordinates.lng},${destinationCoordinates.lat}?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        setDirectionData(res.data.routes[0])
    }

    return (
        <div className='p-5'>
            <h2 className='font-semibold text-[20px]'>Map</h2>
            <div className='rounded-lg overflow-hidden'>
                {userLocation ? <Map
                    ref={mapRef}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                    initialViewState={{
                        longitude: userLocation?.lng,
                        latitude: userLocation?.lat,
                        zoom: 14
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    style={{ width: "100%", height: 550, borderRadius: 10 }}
                >
                    <Markers />

                    {directionData?.geometry?.coordinates ? (
                        <MapBoxRoute coordinates={directionData.geometry.coordinates} />
                    ) : ""}
                </Map> : ""}

                <div className='absolute bottom-[65px] z-20 right-[60px] hidden md:block'>
                    <DistanceTime />
                </div>
            </div>
        </div>
    );
}

export default MapBox