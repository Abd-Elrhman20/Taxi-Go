import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const NavBar = () => {
    return (
        <div className='flex justify-between items-center p-3 px-10 border-b-[1px] shadow-sm'>
            <div className='flex gap-10 items-center'>
                <Link href='/'>
                    <Image src="/logo.png" alt="logo" width={120} height={60} />
                </Link>
                <div className='hidden md:flex gap-6'>
                    <Link className='hover:bg-gray-100 hover:text-black p-2 rounded-md cursor-pointer transition-all' href='/'> Home</Link>
                    {/* <h2 className='hover:bg-gray-100 hover:text-black p-2 rounded-md cursor-pointer transition-all'>Home</h2> */}
                    <h2 className='hover:bg-gray-100 hover:text-black p-2 rounded-md cursor-pointer transition-all'>History</h2>
                    <h2 className='hover:bg-gray-100 hover:text-black p-2 rounded-md cursor-pointer transition-all'>Help</h2>
                </div>
            </div>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}

export default NavBar