import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import useAxiosSecure from '../../Hook/useAxiosSecure';
import useAuth from '../../Hook/useAuth';

import { FaUserFriends, FaTrophy } from 'react-icons/fa';
import { LuAward } from 'react-icons/lu';
import { FiClock, FiCalendar } from 'react-icons/fi';

const CountdownItem = ({ value, label }) => (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 text-center">
        <p className="text-2xl font-bold tabular-nums text-blue-600 dark:text-blue-400 sm:text-3xl">
            {String(value).padStart(2, '0')}
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {label}
        </p>
    </div>
);

const ContestDetails = () => {
    const { user } = useAuth();
    const { detailsId } = useParams();
    const axiosSecure = useAxiosSecure();
    const modalRef = useRef(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        ended: false,
    });

    // Get contest details
    const {
        data: detailsContest,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['details-contest', detailsId],
        queryFn: async () => {
            const result = await axiosSecure.get(`/deltails/contest/${detailsId}`);
            return result.data;
        },
        enabled: !!detailsId,
    });

    // Countdown
    useEffect(() => {
        if (!detailsContest?.deadline) return;

        const calculateTimeLeft = () => {
            const currentDate = new Date();
            const deadline = new Date(detailsContest.deadline);
            const totalTimeLeft = deadline - currentDate;

            if (totalTimeLeft <= 0) {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    ended: true,
                });

                return false;
            }

            const days = Math.floor(
                totalTimeLeft / (1000 * 60 * 60 * 24)
            );

            const hours = Math.floor(
                (totalTimeLeft % (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );

            const minutes = Math.floor(
                (totalTimeLeft % (1000 * 60 * 60)) / (1000 * 60)
            );

            const seconds = Math.floor(
                (totalTimeLeft % (1000 * 60)) / 1000
            );

            setTimeLeft({
                days,
                hours,
                minutes,
                seconds,
                ended: false,
            });

            return true;
        };

        calculateTimeLeft();

        const interval = setInterval(() => {
            const isActive = calculateTimeLeft();

            if (!isActive) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [detailsContest?.deadline]);

    const openSubmitModal = () => {
        modalRef.current?.showModal();
    };

    // Register and payment
    const handleRegisterPayment = async () => {
        const paymentInfo = {
            contestId: detailsContest?._id,
            creatorEmail: detailsContest?.creatorEmail,
            perticipantEmail: user?.email,
            perticipantName: user?.displayName,
            entryPrice: detailsContest?.entryPrice,
            constestName: detailsContest?.contestName,
            contestImage: detailsContest?.contestImage,
            createdAt: new Date(),
        };

        try {
            const result = await axiosSecure.post(
                '/create-checkout-session',
                paymentInfo
            );

            window.location.assign(result.data.url);
        } catch (error) {
            toast.error('Unable to start registration');
        }
    };

    // Get payment status
    const { data: paid } = useQuery({
        queryKey: ['status', detailsContest?._id, user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(
                `/payment-status?contestId=${detailsContest?._id}&perticipantEmail=${user?.email}`
            );

            return result.data;
        },
        enabled: !!detailsContest?._id && !!user?.email,
    });

    // Submit task
    const handleStoreTaskInfo = async (data) => {
        const submitInfo = data.info;
        const submitLink = data.link;

        try {
            await axiosSecure.post(
                `/submit-task?contestId=${detailsContest?._id}&perticipantEmail=${user?.email}`,
                {
                    submitedInfo: submitInfo,
                    submitLink,
                }
            );

            reset();
            toast.success('Task submitted successfully');
            modalRef.current?.close();
        } catch (error) {
            toast.error('Unable to submit your task');
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[600px] items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-blue-600"></span>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        Loading contest details...
                    </p>
                </div>
            </div>
        );
    }

    if (isError || !detailsContest) {
        return (
            <div className="flex min-h-[500px] items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
                <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <FaTrophy className="mx-auto mb-4 text-4xl text-gray-400" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Contest not found
                    </h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        We could not load the contest details.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            {detailsContest.contestType}
                        </span>

                        {!timeLeft.ended && (
                            <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                Active Contest
                            </span>
                        )}

                        {timeLeft.ended && (
                            <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                                Contest Ended
                            </span>
                        )}
                    </div>

                    <h1 className="max-w-4xl text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                        {detailsContest.contestName}
                    </h1>
                </div>

                {/* Contest Image */}
                <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <img
                        src={detailsContest.contestImage}
                        alt={detailsContest.contestName}
                        className="h-[260px] w-full rounded-xl object-cover sm:h-[400px] lg:h-[480px]"
                    />
                </div>

                {/* Main Content */}
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                    {/* Left Content */}
                    <div className="space-y-6">
                        {/* Description and Tasks */}
                        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            {/* Description */}
                            <div className="p-6 sm:p-8">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                                    About this contest
                                </h2>

                                <p className="text-base leading-7 text-gray-600 dark:text-gray-300">
                                    {detailsContest.description}
                                </p>
                            </div>

                            {/* Task Details */}
                            <div className="border-t border-gray-200 p-6 dark:border-gray-700 sm:p-8">
                                <h2 className="mb-5 text-2xl font-bold text-gray-900 dark:text-white">
                                    Task requirements
                                </h2>

                                {detailsContest.taskInstruction?.length > 0 ? (
                                    <ol className="space-y-3">
                                        {detailsContest.taskInstruction.map(
                                            (task, index) => (
                                                <li
                                                    key={index}
                                                    className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900"
                                                >
                                                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                                                        {index + 1}
                                                    </span>

                                                    <span className="pt-1 text-sm leading-6 text-gray-700 dark:text-gray-300 sm:text-base">
                                                        {task}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ol>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400">
                                        No task instructions available.
                                    </p>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar */}
                    <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                        {/* Prize Card */}
                        <section className="rounded-2xl bg-blue-600 p-6 text-white shadow-sm">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                                    <LuAward className="text-2xl" />
                                </div>

                                <div>
                                    <p className="text-sm text-blue-100">
                                        Contest prize
                                    </p>
                                    <h2 className="text-xl font-semibold">
                                        Grand Prize
                                    </h2>
                                </div>
                            </div>

                            <p className="text-4xl font-bold">
                                ${detailsContest.prizeMoney}
                            </p>

                            <p className="mt-2 text-sm text-blue-100">
                                Award for the contest winner
                            </p>
                        </section>

                        {/* Contest Information */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
                                Contest information
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        <FaUserFriends />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Participants
                                        </p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {detailsContest.participantsCount || 0}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        <FiCalendar />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Deadline
                                        </p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {new Date(
                                                detailsContest.deadline
                                            ).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Countdown */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-5 flex items-center gap-2">
                                <FiClock className="text-xl text-blue-600 dark:text-blue-400" />
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Time remaining
                                </h2>
                            </div>

                            {timeLeft.ended ? (
                                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center dark:border-red-900/50 dark:bg-red-900/20">
                                    <p className="font-semibold text-red-700 dark:text-red-300">
                                        This contest has ended
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    <CountdownItem
                                        value={timeLeft.days}
                                        label="Days"
                                    />
                                    <CountdownItem
                                        value={timeLeft.hours}
                                        label="Hours"
                                    />
                                    <CountdownItem
                                        value={timeLeft.minutes}
                                        label="Minutes"
                                    />
                                    <CountdownItem
                                        value={timeLeft.seconds}
                                        label="Seconds"
                                    />
                                </div>
                            )}
                        </section>

                        {/* Action Buttons */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="space-y-3">
                                {paid?.paid === true && (
                                    <button
                                        type="button"
                                        disabled={timeLeft.ended}
                                        onClick={openSubmitModal}
                                        className="w-full rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
                                    >
                                        Submit Task
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={handleRegisterPayment}
                                    disabled={timeLeft.ended}
                                    className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                    Register Now
                                </button>
                            </div>

                            {!paid?.paid && (
                                <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                                    Register first to submit your task.
                                </p>
                            )}
                        </section>
                    </aside>
                </div>
            </div>

            {/* Submit Task Modal */}
            <dialog
                ref={modalRef}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box max-w-lg rounded-2xl bg-white p-6 dark:bg-gray-800 sm:p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Submit your task
                    </h3>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Add your submission link and supporting information below.
                    </p>

                    <form
                        onSubmit={handleSubmit(handleStoreTaskInfo)}
                        className="mt-6 space-y-5"
                    >
                        <div>
                            <label
                                htmlFor="submission-link"
                                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Google Drive link
                            </label>

                            <textarea
                                id="submission-link"
                                rows="3"
                                placeholder="Paste your Google Drive link"
                                {...register('link', {
                                    required: 'Submission link is required',
                                })}
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                            />

                            {errors.link && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.link.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="submission-info"
                                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Submission information
                            </label>

                            <textarea
                                id="submission-info"
                                rows="5"
                                placeholder="Describe your submission briefly"
                                {...register('info', {
                                    required: 'Submission information is required',
                                })}
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                            />

                            {errors.info && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.info.message}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={() => modalRef.current?.close()}
                                className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Task'}
                            </button>
                        </div>
                    </form>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button aria-label="Close modal">close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ContestDetails;