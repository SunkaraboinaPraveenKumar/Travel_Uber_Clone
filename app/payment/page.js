"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function Payment() {
    const router=useRouter();
    const [paymentDetails, setPaymentDetails] = useState({
        amount: 0,
        distance: 0,
    });
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        // Retrieve payment details from local storage
        const storedDetails = JSON.parse(localStorage.getItem('paymentDetails'));
        if (storedDetails) {
            // Set the payment details and format distance and amount to two decimal places
            const formattedDistance = Number(storedDetails.distance).toFixed(2);
            const formattedAmount = Number(storedDetails.amount).toFixed(2);
            const total = (formattedDistance * formattedAmount).toFixed(2);

            setPaymentDetails({
                amount: formattedAmount,
                distance: formattedDistance,
            });
            setTotalAmount(total);
        }
    }, []);

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5'>
            <div className='bg-white p-8 shadow-lg rounded-xl w-full max-w-[600px]'>
                <h2 className='text-2xl font-bold mb-5 text-center'>Complete Your Payment</h2>

                <div className='mb-4'>
                    <p className='text-lg'>Distance: {paymentDetails.distance} km</p>
                    <p className='text-xl font-bold text-gray-800'>Total Amount: ₹{totalAmount}</p>
                </div>

                <div className='mt-6'>
                    <h3 className='text-lg font-semibold mb-4'>Select Payment Method</h3>
                    <div className='grid grid-cols-3 gap-4'>
                        <button
                            className={`p-4 border-2 rounded-md text-center cursor-pointer transition-all duration-200
                                ${paymentMethod === 'upi' ? 'border-green-500' : 'border-gray-300'}`}
                            onClick={() => setPaymentMethod('upi')}
                        >
                            UPI
                        </button>
                        <button
                            className={`p-4 border-2 rounded-md text-center cursor-pointer transition-all duration-200
                                ${paymentMethod === 'card' ? 'border-green-500' : 'border-gray-300'}`}
                            onClick={() => setPaymentMethod('card')}
                        >
                            Card
                        </button>
                        <button
                            className={`p-4 border-2 rounded-md text-center cursor-pointer transition-all duration-200
                                ${paymentMethod === 'cash' ? 'border-green-500' : 'border-gray-300'}`}
                            onClick={() => setPaymentMethod('cash')}
                        >
                            Cash
                        </button>
                    </div>
                </div>

                {/* Payment Details based on method */}
                <div className='mt-6'>
                    {paymentMethod === 'upi' && (
                        <div>
                            <h4 className='text-lg font-semibold mb-2'>Enter UPI ID</h4>
                            <input
                                type='text'
                                placeholder='example@upi'
                                className='w-full p-3 border rounded-md outline-none focus:border-green-500'
                            />
                        </div>
                    )}
                    {paymentMethod === 'card' && (
                        <div>
                            <h4 className='text-lg font-semibold mb-2'>Enter Card Details</h4>
                            <input
                                type='text'
                                placeholder='Card Number'
                                className='w-full p-3 mb-3 border rounded-md outline-none focus:border-green-500'
                            />
                            <div className='grid grid-cols-2 gap-3'>
                                <input
                                    type='text'
                                    placeholder='Expiry (MM/YY)'
                                    className='w-full p-3 border rounded-md outline-none focus:border-green-500'
                                />
                                <input
                                    type='text'
                                    placeholder='CVV'
                                    className='w-full p-3 border rounded-md outline-none focus:border-green-500'
                                />
                            </div>
                        </div>
                    )}
                    {paymentMethod === 'cash' && (
                        <div>
                            <p className='text-lg'>Please keep the exact amount of ₹{totalAmount} ready for cash payment upon car delivery.</p>
                        </div>
                    )}
                </div>

                {/* Pay Button */}
                <button
                    className='w-full mt-6 p-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-all duration-300'
                    onClick={() => {alert(`Payment of ₹${totalAmount} successful!`)
                    router.replace("/")
                }}
                >
                    Pay ₹{totalAmount}
                </button>
            </div>
        </div>
    );
}

export default Payment;
