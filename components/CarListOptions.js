"use client";
import { CarListData } from '@/utils/CarListData';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CarListItem from './CarListItem';

function CarListOptions({ distance }) {
    const [activeIdx, setActiveIdx] = useState();
    const [selectedCar, setSelectedCar] = useState();
    const router = useRouter();

    useEffect(() => {
        console.log(selectedCar);
    }, [selectedCar]);

    const handleSelectCar = (item, index) => {
        setActiveIdx(index);
        setSelectedCar(item);
    };

    const handleRequestPayment = () => {
        const selectedAmount = selectedCar?.amount; // Assuming `item` has a `price` property
        const selectedDistance = distance; // Use the distance prop directly

        // Save to local storage
        localStorage.setItem('paymentDetails', JSON.stringify({
            amount: selectedAmount,
            distance: selectedDistance,
        }));

        // Navigate to the payment page
        router.push('/payment');
    };

    return (
        <div className='m-5 p-3 sm:p-5 overflow-auto h-[250px]'>
            <h2 className='text-[18px] sm:text-[22px] font-bold'>Recommended</h2>
            {CarListData.map((item, index) => (
                <div
                    className={`cursor-pointer p-2 px-4 rounded-md border-black transition-all duration-300
                        ${activeIdx === index ? 'border-[3px]' : 'border-[1px]'}
                        hover:shadow-lg`}
                    key={index}
                    onClick={() => handleSelectCar(item, index)}
                >
                    <CarListItem car={item} distance={distance} />
                </div>
            ))}

            {selectedCar?.name && (
                <div className='flex justify-between fixed bottom-5 left-0 bg-white p-3 shadow-xl rounded-lg w-full md:w-[70%] lg:w-[50%] xl:w-[30%] mx-auto border-[1px] items-center'>
                    <h2 className='text-[16px] sm:text-[18px]'>Make Payment For</h2>
                    <button
                        className='p-2 sm:p-3 bg-black text-white rounded-lg text-center text-[14px] sm:text-[16px]'
                        onClick={handleRequestPayment}
                    >
                        Request {selectedCar.name}
                    </button>
                </div>
            )}
        </div>
    );
}

export default CarListOptions;
