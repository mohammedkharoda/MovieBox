'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotFound = () => {
    const router = useRouter()
    const goBack = () => {
        router.push('/')
    }
    return (
        <div className='bg-gradient-to-r from-[#f5e6ad] to-[#f13c77] h-screen'>
            <div>
                <p className='text-4xl text-center font-sans font-bold pt-10 text-white italic'>
                    404 Page not Found!!
                </p>
                <Image
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXQxOWgzaTd4dmc1cThndXduc2hrMWFvNnNqdXgxZHBxOTJqank2dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hyyV7pnbE0FqLNBAzs/giphy.gif"
                    alt="tom-gif"
                    width={400}
                    height={400}
                    className="mx-auto mt-10 rounded-lg drop-shadow-lg"
                />
                <button className='w-full mx-auto' onClick={goBack} >
                    <p className='text-2xl font-sans font-bold pt-20 text-white italic mx-auto hover:underline-offset-2 hover:underline'>
                        Please Go Back!
                    </p>
                </button>
            </div>
        </div>

    )
}

export default NotFound
