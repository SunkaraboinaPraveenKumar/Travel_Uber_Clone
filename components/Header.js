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
        <div className='p-4 pb-3 pl-10 shadow-lg flex items-center justify-between gap-4 flex-wrap'>
            <div className='flex gap-24 items-center'>
                <Image src={'/logo.png'} height={70} width={70} alt='logo' />

                <div className='flex gap-6 items-center justify-between'>
                    {headerMenu.map((item, index) => (
                        <div key={index} className='flex gap-2 items-center'>
                            <Image src={item.icon} alt='image' width={25} height={25} />
                            <h2 className='text-[14px] font-medium'>{item.name}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className='hidden md:block'> {/* Hide on mobile */}
                <UserButton />
            </div>

            <div className='md:hidden'> {/* Show on mobile */}
                <UserButton />
            </div>
        </div>
    );
}

export default Header;
