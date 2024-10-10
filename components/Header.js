import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';

function Header() {
    const headerMenu = [
        {
            id: 1,
            name: 'Ride',
            icon: '/taxi.png',
        },
        {
            id: 2,
            name: 'Package',
            icon: '/box.png',
        },
    ];

    return (
        <div className='p-4 pb-3 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-4'>
                <Image src={'/logo.png'} height={50} width={50} alt='logo' />

                <div className='flex gap-6 items-center'>
                    {headerMenu.map((item) => (
                        <div key={item.id} className='flex gap-2 items-center'>
                            <Image src={item.icon} alt={item.name} width={25} height={25} />
                            <h2 className='text-[14px] font-medium'>{item.name}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-4 md:mt-0'> {/* Keeps the button aligned vertically on small screens */}
                <UserButton />
            </div>
        </div>
    );
}

export default Header;
