"use client"
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { SourceCoordinatesContext } from '@/context/SourceCoordinatesContext'
import { DestinationCoordinatesContext } from '@/context/DestinationCoordinatesContext'

const session_token = '5ccce4a4-ab0a-4a7c-943d-580e55542363'
const MAPBOX_RETRIVE_URL = 'https://api.mapbox.com/search/searchbox/v1/retrieve/'

const AutoCompleteAddress = () => {
    const [source, setSource] = useState<any>()
    const [addressList, setAddressList] = useState<any>()
    // const [sourceChange, setSourceChange] = useState<any>(false)
    const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCoordinatesContext)

    const [destination, setDistination] = useState<any>()
    const [destinationList, setDestinationList] = useState<any>()
    // const [destinationChange, setDestinationChange] = useState<any>(false)
    const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCoordinatesContext)

    async function getAddress() {
        await axios.get(`/api?q=${source}`,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((res) => {
                setAddressList(res.data)
            })
    }

    async function getAddress2() {
        await axios.get(`/api?q=${destination}`,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((res) => {
                setDestinationList(res.data)
            })
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getAddress()
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
        // getAddress()
    }, [source])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getAddress2()
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
        // getAddress2()
    }, [destination])


    const onSourceAddressClick = async (item: any) => {
        setSource(item.name)
        setAddressList([])
        // setSourceChange(false)
        const res = await axios.get(MAPBOX_RETRIVE_URL + item.mapbox_id
            + "?session_token=" + session_token
            + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)
        setSourceCoordinates({ lng: res.data.features[0].geometry.coordinates[0], lat: res.data.features[0].geometry.coordinates[1] })
        // console.log(res.data)
    }

    const onDestinationAddressClick = async (item: any) => {
        setDistination(item.name);
        setDestinationList([])
        // setDestinationChange(false)
        const res = await axios.get(MAPBOX_RETRIVE_URL + item.mapbox_id
            + "?session_token=" + session_token
            + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)
        setDestinationCoordinates({ lng: res.data.features[0].geometry.coordinates[0], lat: res.data.features[0].geometry.coordinates[1] })
        // console.log(res.data)
    }


    return (
        <div className=''>
            <div className='relative'>
                <label htmlFor="whereFrom" className='text-gray-400'>Where From ?</label>
                <input onChange={(e) => setSource(e.target.value)} value={source} className='p-1 border-[1px] mt-[2.5px] rounded-md outline-none w-100 focus:border-yellow-300 focus:border-[2px] focus:text-black' id='whereFrom' type="text" />
                {addressList?.suggestions ?
                    <div className='shadow-md p-1 rounded-md absolute bg-white z-20'>
                        {addressList?.suggestions.map((item: any, idx: number) =>
                        (
                            <h2 className='p-3 hover:bg-gray-100 cursor-pointer' key={idx} onClick={() => { onSourceAddressClick(item) }} >{item.name}</h2>
                        )
                        )}
                    </div>
                    : ""}
            </div>
            <div className='relative mt-4'>
                <label htmlFor='whereTo' className='text-gray-400'>Where To?</label>
                <input type="text" id='whereTo'
                    className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300 text-[14px]' value={destination}
                    onChange={(e) => { setDistination(e.target.value) }}
                />

                {destinationList?.suggestions ?
                    <div className='shadow-md p-1 rounded-md absolute  bg-white'>
                        {destinationList?.suggestions.map((item: any, index: number) => (
                            <h2 key={index} className='p-3 hover:bg-gray-100 cursor-pointer'
                                onClick={() => { onDestinationAddressClick(item) }}
                            >{item.name}</h2>
                        ))}
                    </div> : null}
            </div>
        </div>
    )
}

export default AutoCompleteAddress