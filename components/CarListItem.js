import Image from 'next/image'
import React from 'react'
import { HiUser } from "react-icons/hi2"

function CarListItem({ car, distance }) {
    return (
        <div>
            <div className='flex flex-col md:flex-row items-center justify-between mt-5'>
                {/* Image and car details */}
                <div className='flex flex-col md:flex-row items-center gap-3 md:gap-5'>
                    <Image src={car.image} width={100} height={100} alt='car' className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]" />
                    <div>
                        <h2 className='font-semibold text-[16px] md:text-[18px] flex gap-2 items-center'>
                            {car.name}
                            <span className='flex font-normal text-[12px] md:text-[14px] gap-1 md:gap-2 items-center'>
                                <HiUser />{car.seat}
                            </span>
                        </h2>
                        <p className="text-[12px] md:text-[14px]">{car.desc}</p>
                    </div>
                </div>
                {/* Pricing */}
                <h2 className='font-semibold text-[16px] md:text-[18px] flex gap-1 mt-3 md:mt-0'>
                    {(car.amount * distance).toFixed(2)}
                    <p>&#8377;</p>
                </h2>
            </div>
        </div>
    )
}

export default CarListItem
