
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const SuccessPayment = () => {
    const axiosSecure = useAxiosSecure()
    const [searchParams, setSearchParams] = useSearchParams()
    const [paymentInfo,setPaymentInfo] = useState({})

    const sessionId = searchParams.get('session_id')
    const iscalled = useRef(false)
    useEffect(() => {
        if (!sessionId || iscalled.current) {
            return
        }
        iscalled.current = true

        const sendPaymentSuccess = async () => {
            try {
                const result = await axiosSecure.post('/payment-success', { sessionId });
                setPaymentInfo(result.data)
            } catch (err) {
                console.error(err);
            }
        };

        sendPaymentSuccess();
        
    }, [sessionId])

    // console.log(paymentInfo)

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='bg-base-100 p-10 rounded-xl'>
                <div className='space-y-2 mb-5'>
                    <h2 className='text-2xl md:text-5xl font-bold'>Your Payment Successfully</h2>
                    <p className='text-sm md:text-[18px] text-gray-700 dark:text-white text-center'>Your payment has been processed successfully. <br /> Thank you for your purchase.</p>
                </div>

                <div className='border border-gray-100 p-4 flex flex-col gap-2'>
                    <div className='flex flex-col md:flex-row justify-between  text-sm md:text-[16px] gap-1 md:gap-0'>
                        <h2 className='font-bold text-gray-600 dark:text-gray-200'>Transaction ID</h2>
                        <span>{paymentInfo?.transactionId}</span>
                    </div>

                    <div className='flex flex-col md:flex-row justify-between  text-sm md:text-[16px] gap-1 md:gap-0'>
                        <h2 className='font-bold text-gray-600 dark:text-gray-200'>Amount</h2>
                        <span>${paymentInfo?.amount}</span>
                    </div>

                    <div className='flex flex-col md:flex-row justify-between  text-sm md:text-[16px] gap-1 md:gap-0'>
                        <h2 className='font-bold text-gray-600 dark:text-gray-200'>Date & Time</h2>
                        <span>{paymentInfo.createdAt}</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SuccessPayment;