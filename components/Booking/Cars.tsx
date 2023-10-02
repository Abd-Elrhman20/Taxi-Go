"use client"
import React, { useContext, useState } from 'react'
import carsList from '@/data/carsList'
import Image from 'next/image'
import { DirectionDataContext } from '@/context/DirectionDataContext'
import { SelectedCarAmountContext } from '@/context/SelectedCarAmount'

const Cars = () => {
    const [selectedCar, setSelectedCar] = useState<any>()
    const { directionData, setDirectionData } = useContext(DirectionDataContext)
    const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext)


    const getCost = (charges: any) => {
        if (directionData) {
            return (charges * directionData?.distance * 0.000621371192).toFixed(2)   // to convert meters to miles
        } else {
            return null
        }
    }

    return (
        <div className='mt-4'>
            <h2 className='font-semibold'>Select Car</h2>
            <div className='row'>{carsList.map((car, idx) => (
                <div className='col-md-4 flex flex-col justify-center text-center p-1 ' key={idx}>
                    <div className={`border-[1px] rounded-md p-1 hover:border-yellow-500 cursor-pointer ${idx == selectedCar ? "border-yellow-500 border-[2px]" : ""}`} onClick={() => { setSelectedCar(idx); if (getCost != null) { setCarAmount(getCost(car.charges)) } }}>
                        <Image src={car.image} alt={car.name} className='w-100' width={100} height={90} />
                        <h2>{car.name}</h2>
                        {directionData ? <span className='ms-1 text-gray-500' style={{ lineHeight: "15px" }}>{getCost(car.charges)}$</span> : null}
                    </div>
                </div>
            ))}</div>
        </div>
    )
}

export default Cars