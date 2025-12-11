import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { FaUserFriends } from 'react-icons/fa';
import { LuAward } from 'react-icons/lu';
import { useEffect, useRef, useState } from 'react';
import { BiAward } from 'react-icons/bi';

const ContestDetails = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        ended: false
    });

    const modalRef = useRef()
    const { detailsId } = useParams();
    const axiosSecure = useAxiosSecure()


    const { data: detailsContest, isLoading } = useQuery({
        queryKey: ['details-contest', detailsId],
        queryFn: async () => {
            const result = await axiosSecure.get(`/deltails/contest/${detailsId}`);
            return result.data;
        }
    })

    // DEADLINE COUNTDOWN FUNCTION
    useEffect(() => {
        const interval = setInterval(() => {
            if (!detailsContest?.deadline) return;

            const currentDate = new Date();
            const countDownDate = new Date(detailsContest.deadline);
            const totalTimeLeft = countDownDate - currentDate;

            if (totalTimeLeft <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: false })
                return clearInterval(interval)
            }

            const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((totalTimeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((totalTimeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((totalTimeLeft % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds, ended: true })
        }, 1000)


    }, [detailsContest?.deadline, setTimeLeft, timeLeft]);



    // HANDLE MODAL FUCNTION 
    const handelSubmitTaskModal = () => {
        modalRef.current.showModal()
    }





    return (
        <div className='flow-root'>
            <div className='my-5'>
                <div> <h2 className='text-4xl font-extrabold text-[#0C3B5B] tracking-wide mb-5  md:text-5xl md:font-bold  dark:text-white'>{detailsContest?.contestName}</h2> </div>
                <div className='shadow-md h-[500px] overflow-hidden rounded-xl my-4'>
                    <img src={detailsContest?.contestImage} alt="" className='w-full h-full object-cover rounded-xl' />
                </div>

                <div className='flex gap-4 mt-10'>
                    <button className='btn  bg-green-400 text-white rounded-full dark:bg-secondary dark:text-white'>{detailsContest?.contestType}</button>
                    <div className='flex items-center'> <button className='btn  bg-sky-700 dark:bg-sky-600 text-white rounded-full font-medium'><FaUserFriends /> {detailsContest?.participantsCount} Participants</button> </div>
                </div>

                {/* PRIZE MONEY SECTION */}
                <div className='bg-[#1AA6B7] text-white p-8 rounded-2xl shadow-lg md:w-[800px] mx-auto text-center mt-20'>
                    <div className='text-white'>
                        <div className='flex justify-center items-center'>
                            <p> <LuAward size={30} className='mx-auto' /> </p>
                            <p className='text-2xl md:text-5xl font-bold'>Grand Prize</p>
                        </div>
                        <p className='text-center text-3xl font-bold'>${detailsContest?.entryPrice}</p>
                    </div>
                    <p className='text-center text-white'>Plus mentorship opportunities <br /> with industry leaders!</p>
                </div>

                {/* SUBMISSION DEADLINE SECTION */}
                {
                    !timeLeft.ended ? <div className='md:w-[800px] bg-red-400 p-10 mx-auto my-10 rounded-xl'><p className='text-white text-2xl md:text-5xl font-bold text-center'>Contest Ended</p></div> :
                        <div className='py-20'>
                            <h2 className='text-xl md:text-5xl font-bold text-center text-primary dark:text-white mb-4'> Submission Deadline </h2>
                            <div className='bg-primary px-5 py-5 md:px-20 md:py-20 shadow grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-5 rounded-xl'>
                                <div className='bg-base-100 rounded-lg px-5 py-10 shadow text-center'>
                                    <span className='text-4xl text-primary dark:text-white font-bold'>{timeLeft.days}</span>
                                    <p className='text-xl font-bold'>Days</p>
                                </div>
                                <div className='bg-base-100 rounded-lg px-5 py-10 shadow text-center'>
                                    <span className='text-4xl text-primary dark:text-white font-bold'> {timeLeft.hours} </span>
                                    <p className='text-xl font-bold'> Hours </p>
                                </div>
                                <div className='bg-base-100 rounded-lg px-5 py-10 shadow text-center'>
                                    <span className='text-4xl text-primary dark:text-white font-bold'>{timeLeft.minutes} </span>
                                    <p className='text-xl font-bold'>Minutes</p>
                                </div>

                                <div className='bg-base-100 rounded-lg px-5 py-10 shadow text-center'>
                                    <span className='text-4xl text-primary dark:text-white font-bold'>{timeLeft.seconds}</span>
                                    <p className='text-xl font-bold'>  Second</p>
                                </div>
                            </div>
                        </div>
                }

                {/* CONTEST DESCIPTION AND TASK DETAILS SECTION  */}
                <div className='mt-10'>
                    <h2 className=' text-xl md:text-5xl text-center mb-4 text-primary dark:text-white font-bold'>Contest Description & Task details</h2>
                    <div className="bg-white dark:bg-gray-700 dark:border-2 dark:border-primary p-8 rounded-xl shadow-md ">
                        <h2 className="text-2xl font-bold text-[#0C3B5B] dark:text-white">Contest Description</h2>
                        <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg leading-relaxed">
                            {detailsContest?.description}
                        </p>

                        <h2 className="text-2xl font-bold text-[#0C3B5B] dark:text-white mt-6">Task Details</h2>

                        <ul className="list-disc ml-6 mt-2 space-y-2 text-lg text-gray-700 dark:text-gray-300">
                            {detailsContest?.taskInstruction?.map((task, idx) => (
                                <li key={idx}>{task}</li>
                            ))}
                        </ul>
                    </div>
                </div>


                {/* REGISTER AND SUBMIT SECTION */}
                <div className="flex justify-center gap-4 mt-8">
                    <button disabled={!timeLeft.ended} onClick={handelSubmitTaskModal} className="px-6 py-3 bg-[#1AA6B7] hover:bg-[#178a99] text-white rounded-xl shadow-md font-semibold">
                        Submit Task
                    </button>
                    <button disabled={!timeLeft.ended} className="px-6 py-3 bg-[#073B63] hover:bg-[#052b48] text-white rounded-xl shadow-md font-semibold">
                        Register
                    </button>
                </div>


            </div>

            {/* MODAL  */}

            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <fieldset>
                        <textarea className='textarea w-full' placeholder='Provide your submission (Google Drive link, GitHub link, or details)...'></textarea>
                    </fieldset>
                    <div className="modal-action">
                        <form className='flex gap-2 items-center' method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className='btn btn-primary'>Submit</button>
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ContestDetails;