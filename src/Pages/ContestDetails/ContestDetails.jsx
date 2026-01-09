import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { FaUserFriends } from 'react-icons/fa';
import { LuAward } from 'react-icons/lu';
import { useEffect, useRef, useState } from 'react';
import { BiAward } from 'react-icons/bi';
import useAuth from '../../Hook/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiClock } from 'react-icons/fi';

const ContestDetails = () => {
    const { user } = useAuth()
    const modalRef = useRef()
    const { detailsId } = useParams();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm()

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        ended: false
    });

    // GET DATA 
    const { data: detailsContest, isLoading } = useQuery({
        queryKey: ['details-contest', detailsId],
        queryFn: async () => {
            const result = await axiosSecure.get(`/deltails/contest/${detailsId}`);
            return result.data;
        }
    })

    // DEADLINE COUNTDOWN 
    useEffect(() => {
        const interval = setInterval(() => {
            if (!detailsContest?.deadline) return;

            const currentDate = new Date();
            const countDownDate = new Date(detailsContest.deadline);
            const totalTimeLeft = countDownDate - currentDate;

            if (totalTimeLeft <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: true })
                return clearInterval(interval)
            }

            const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((totalTimeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((totalTimeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((totalTimeLeft % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds, ended: false })
        }, 1000)
        return () => clearInterval(interval)

    }, [detailsContest?.deadline, setTimeLeft]);

    // HANDLE MODAL FUCNTION 
    const handelSubmitTaskModal = () => {
        modalRef.current.showModal()
    }

    // HANDLE REGISTER AND PAYMNET
    const handleRegisterPayment = async () => {
        const paymentInfo = {
            contestId: detailsContest?._id,
            creatorEmail: detailsContest?.creatorEmail,
            perticipantEmail: user?.email,
            perticipantName: user?.displayName,
            entryPrice: detailsContest?.entryPrice,
            constestName: detailsContest?.contestName,
            contestImage: detailsContest?.contestImage,
            createdAt: new Date()
        }

        const result = await axiosSecure.post('/create-checkout-session', paymentInfo)
        window.location.assign(result.data.url)
    }

    // get paid status
    const { data: paid } = useQuery({
        queryKey: ['status', detailsContest?._id, user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/payment-status?contestId=${detailsContest?._id}&perticipantEmail=${user?.email}`);
            return result.data
        },
        enabled: !!detailsContest?._id && !!user?.email,
    });

    // Store task info i perticipentCollection
    const handleStoreTaskInfo = async (data) => {
        const submitLink = data.link;
        const submitInfo = data.info;
        const result = await axiosSecure.post(`/submit-task?contestId=${detailsContest?._id}&perticipantEmail=${user?.email}`, { submitedInfo: submitInfo, submitLink: submitLink });
        reset()
        toast.success('Task Submited Successfully')
        modalRef.current.close();
    }

    return (
        <div className='flow-root'>
            <div className='my-5 md:my-10'>
                
                {/* Title Section */}
                <div className='mb-8'>
                    <h2 className='text-3xl md:text-6xl font-bold text-primary dark:text-white mb-4 leading-tight'>
                        {detailsContest?.contestName}
                    </h2>
                </div>

                {/* Image Section */}
                <div className='shadow-xl rounded-2xl overflow-hidden h-[400px] md:h-[600px] mb-8 group'>
                    <img 
                        src={detailsContest?.contestImage} 
                        alt="" 
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl'
                    />
                </div>

                {/* Badge Section */}
                <div className='flex gap-3 md:gap-4 flex-wrap mb-10'>
                    <div className='bg-gradient-to-r from-secondary to-secondary/80 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow'>
                        {detailsContest?.contestType}
                    </div>
                    <div className='bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/80 text-white dark:text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2'>
                        <FaUserFriends size={18} />
                        <span>{detailsContest?.participantsCount} Participants</span>
                    </div>
                </div>

                {/* PRIZE MONEY SECTION */}
                <div className='bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80 text-white p-10 md:p-16 rounded-3xl shadow-2xl md:w-full lg:max-w-[800px] mx-auto text-center mb-16 border border-accent/20'>
                    <div className='flex justify-center items-center gap-4 mb-6'>
                        <LuAward size={40} className='text-accent animate-bounce' />
                        <h3 className='text-3xl md:text-5xl font-bold'>Grand Prize</h3>
                    </div>
                    <div className='text-5xl md:text-6xl font-bold text-accent mb-4'>
                        ${detailsContest?.prizeMoney}
                    </div>
                    <p className='text-lg md:text-xl text-white/90'>
                        Plus mentorship opportunities with industry leaders!
                    </p>
                </div>

                {/* SUBMISSION DEADLINE SECTION */}
                {
                    timeLeft.ended ? 
                    <div className='bg-gradient-to-r from-red-500 to-red-600 p-12 mx-auto my-10 rounded-2xl shadow-xl text-center'>
                        <p className='text-white text-3xl md:text-5xl font-bold'>🏁 Contest Ended</p>
                    </div> 
                    :
                    <div className='py-12 md:py-20'>
                        <h2 className='text-2xl md:text-5xl font-bold text-center text-primary dark:text-white mb-8 flex items-center justify-center gap-3'>
                            <FiClock size={32} className='text-secondary' />
                            Submission Deadline
                        </h2>
                        <div className='bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-gray-800 dark:to-gray-800 px-6 py-10 md:px-10 md:py-16 shadow-lg grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 rounded-2xl border-2 border-secondary/20 dark:border-secondary/30'>
                            
                            <div className='bg-white dark:bg-gray-700 rounded-xl px-4 py-8 md:px-6 md:py-12 shadow-md hover:shadow-xl transition-shadow duration-300 border-2 border-secondary/10 dark:border-secondary/20'>
                                <span className='text-4xl md:text-5xl font-bold text-secondary dark:text-accent block mb-3'>{timeLeft.days}</span>
                                <p className='text-lg md:text-xl font-semibold text-primary dark:text-white'>Days</p>
                            </div>
                            
                            <div className='bg-white dark:bg-gray-700 rounded-xl px-4 py-8 md:px-6 md:py-12 shadow-md hover:shadow-xl transition-shadow duration-300 border-2 border-secondary/10 dark:border-secondary/20'>
                                <span className='text-4xl md:text-5xl font-bold text-secondary dark:text-accent block mb-3'>{timeLeft.hours}</span>
                                <p className='text-lg md:text-xl font-semibold text-primary dark:text-white'>Hours</p>
                            </div>
                            
                            <div className='bg-white dark:bg-gray-700 rounded-xl px-4 py-8 md:px-6 md:py-12 shadow-md hover:shadow-xl transition-shadow duration-300 border-2 border-secondary/10 dark:border-secondary/20'>
                                <span className='text-4xl md:text-5xl font-bold text-secondary dark:text-accent block mb-3'>{timeLeft.minutes}</span>
                                <p className='text-lg md:text-xl font-semibold text-primary dark:text-white'>Minutes</p>
                            </div>

                            <div className='bg-white dark:bg-gray-700 rounded-xl px-4 py-8 md:px-6 md:py-12 shadow-md hover:shadow-xl transition-shadow duration-300 border-2 border-secondary/10 dark:border-secondary/20'>
                                <span className='text-4xl md:text-5xl font-bold text-secondary dark:text-accent block mb-3'>{timeLeft.seconds}</span>
                                <p className='text-lg md:text-xl font-semibold text-primary dark:text-white'>Seconds</p>
                            </div>
                        </div>
                    </div>
                }

                {/* CONTEST DESCIPTION AND TASK DETAILS SECTION */}
                <div className='mt-16 md:mt-20'>
                    <h2 className='text-2xl md:text-5xl text-center mb-10 text-primary dark:text-white font-bold'>Contest Description & Task Details</h2>
                    
                    <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-lg border-2 border-secondary/20 dark:border-secondary/30">
                        
                        <div className='mb-10'>
                            <h3 className="text-2xl md:text-3xl font-bold text-primary dark:text-white flex items-center gap-3 mb-4">
                                <span className='w-2 h-2 bg-secondary rounded-full'></span>
                                Contest Description
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed bg-secondary/5 dark:bg-secondary/10 p-6 rounded-lg">
                                {detailsContest?.description}
                            </p>
                        </div>

                        <div className='border-t-2 border-secondary/20 dark:border-secondary/30 pt-10'>
                            <h3 className="text-2xl md:text-3xl font-bold text-primary dark:text-white flex items-center gap-3 mb-6">
                                <span className='w-2 h-2 bg-secondary rounded-full'></span>
                                Task Details
                            </h3>

                            <ul className="space-y-4">
                                {detailsContest?.taskInstruction?.map((task, idx) => (
                                    <li key={idx} className='flex gap-4 items-start p-4 bg-secondary/5 dark:bg-secondary/10 rounded-lg border-l-4 border-secondary hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-colors'>
                                        <span className='text-secondary dark:text-accent font-bold text-lg flex-shrink-0 mt-1'>{idx + 1}.</span>
                                        <span className='text-gray-700 dark:text-gray-200 text-base md:text-lg'>{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* REGISTER AND SUBMIT SECTION */}
                <div className="flex flex-col md:flex-row justify-center gap-4 mt-12 md:mt-16">
                    {
                        paid?.paid === true &&
                        <button 
                            disabled={timeLeft.ended} 
                            onClick={handelSubmitTaskModal} 
                            className="px-8 py-4 bg-gradient-to-r from-secondary to-secondary/80 hover:shadow-xl text-white rounded-xl shadow-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit Task
                        </button>
                    }
                    <button 
                        onClick={handleRegisterPayment} 
                        disabled={timeLeft.ended} 
                        className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/80 hover:shadow-xl text-white rounded-xl shadow-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Register Now
                    </button>
                </div>
            </div>

            {/* MODAL */}
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white dark:bg-gray-800 rounded-2xl">
                    <h3 className='text-2xl font-bold text-primary dark:text-white mb-6'>Submit Your Task</h3>
                    
                    <form onSubmit={handleSubmit(handleStoreTaskInfo)} className='space-y-6'>
                        <div>
                            <label className='block text-primary dark:text-white font-semibold mb-2'>Google Drive Link</label>
                            <textarea 
                                {...register('link')} 
                                className='textarea w-full bg-white dark:bg-gray-700 border-2 border-secondary/30 dark:border-secondary/40 text-primary dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-secondary focus:outline-none rounded-lg p-4' 
                                placeholder='Provide your submission Google Drive link...'
                            ></textarea>
                        </div>
                        
                        <div>
                            <label className='block text-primary dark:text-white font-semibold mb-2'>Submission Info</label>
                            <textarea 
                                {...register('info')} 
                                className='textarea w-full bg-white dark:bg-gray-700 border-2 border-secondary/30 dark:border-secondary/40 text-primary dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-secondary focus:outline-none rounded-lg p-4' 
                                placeholder='Provide your submission info...'
                            ></textarea>
                        </div>

                        <div className='flex gap-3 justify-end pt-4'>
                            <button 
                                type='button'
                                onClick={() => modalRef.current.close()}
                                className='btn btn-ghost rounded-lg text-primary dark:text-white hover:bg-secondary/10'
                            >
                                Close
                            </button>
                            <button 
                                type='submit'
                                className='btn bg-gradient-to-r from-secondary to-secondary/80 text-white border-0 rounded-lg hover:shadow-lg'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ContestDetails;