import Image from 'next/image'
import React from 'react'
import {HiUser} from "react-icons/hi2"
function CarListItem({ car,distance }) {
    return (
        <div>
            <div className='flex items-center justify-between mt-5'>
                <div className='flex items-center gap-5'>
                    <Image src={car.image} width={100} height={100} alt='car' />
                    <div>
                        <h2 className='font-semibold text-[18px] flex gap-3 items-center'>
                            {car.name}
                            <span className='flex font-normal text-[14px] gap-2 items-center'>
                              <HiUser/>{car.seat}
                            </span>
                        </h2>
                        <p>{car.desc}</p>
                    </div>
                </div>
                <h2 className='font-semibold text-[18px] flex gap-1'>{(car.amount * distance).toFixed(2)}<p>&#8377;</p></h2>
            </div>
        </div>
    )
}

export default CarListItem