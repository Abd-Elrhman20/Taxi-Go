"use client"
import cardsList from '@/data/cardsList'
import Image from 'next/image'
import React, { useState } from 'react'

const Cards = () => {
    const [activeIndex, setActiveIndex] = useState<any>()
    return (
        <div>
            <h2 className='font-medium text-[14px]'>Payment Method</h2>
            <div className='flex justify-between mt-2'>
                {cardsList.map((card, idx) => (
                    <div key={idx} className={`cards w-[50px] border-[1px] flex justify-center items-center rounded-md cursor-pointer hover:scale-110 transition-all hover:border-yellow-500 ${activeIndex == idx ? "border-yellow-500 border-[2px]" : ""}`} 
                    onClick={() => setActiveIndex(idx)} >
                        <Image src={card.image} alt={card.name} width={30} height={50} />
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Cards