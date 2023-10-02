import { SelectedCarAmountContext } from '@/context/SelectedCarAmount'
import AutoCompleteAddress from './AutoCompleteAddress'
import Cards from './Cards'
import Cars from './Cars'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

const Booking = () => {
    const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext)
    const Router = useRouter()



    // const ScreenHeight = window.innerHeight
    return (
        <div className='p-5'>
            <h2 className='text-[20px] font-semibold mb-2'>Booking</h2>
            <div className='border-[1px] rounded-md p-5'>
                <AutoCompleteAddress />
                <Cars />
                <Cards />
                <button className={`w-full bg-gray-200 p-1 rounded-md mt-4 ${carAmount ? "bg-yellow-400" : ""}`} disabled={!carAmount}  onClick={() => { Router.push('/payment') }}>Book</button>
                {/* <button className={`w-full bg-gray-200 p-1 rounded-md mt-4 ${carAmount ? "bg-yellow-400" : ""}`} onClick={() => { Router.push('/payment') }}>Book</button> */}
            </div>
        </div>
    )
}

export default Booking