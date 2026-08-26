import React, { useRef, useState, useEffect } from 'react';
import { GoTrophy } from 'react-icons/go';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hook/useAuth';

const Navbar = () => {
    const { user, userSignOut } = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [open, setOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);

    /* ── keep existing logic untouched ── */
    const handleSignOut = async () => {
        await userSignOut();
        setMobileOpen(false);
    };

    useEffect(() => {
        const html = document.querySelector('html');
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleTheme = (checked) => {
        setTheme(checked ? 'dark' : 'light');
    };

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, []);

    /* Subtle shadow on scroll */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* Lock body scroll when mobile drawer is open */
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);
    /* ────────────────────────────────── */

    const navLinkClass = ({ isActive }) =>
        isActive
            ? 'text-secondary font-semibold relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-secondary after:rounded-full'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors duration-150 font-medium';

    const links = (
        <>
            <li><NavLink className={navLinkClass} to='/'>Home</NavLink></li>
            <li><NavLink className={navLinkClass} to='/all-contest'>All Contest</NavLink></li>
            <li><NavLink className={navLinkClass} to='/leaderboard'>Leaderboard</NavLink></li>
            <li><NavLink className={navLinkClass} to='/about'>About</NavLink></li>
            <li><NavLink className={navLinkClass} to='/contact'>Contact</NavLink></li>
        </>
    );

    /* Mobile drawer link styling (bigger tap area) */
    const mobileLinkClass = ({ isActive }) =>
        `block w-full px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
            isActive
                ? 'bg-secondary/10 text-secondary'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
        }`;

    return (
        <header
            className={`sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-shadow duration-200 ${scrolled ? 'shadow-sm' : ''}`}
        >
            <div className='max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4'>

                {/* ── Logo ── */}
                <Link to='/' className='flex items-center gap-2 shrink-0'>
                    <span className='w-8 h-8 bg-secondary rounded-lg flex items-center justify-center shadow-sm'>
                        <GoTrophy size={16} className='text-white' />
                    </span>
                    <span className='text-[15px] font-bold tracking-tight text-primary dark:text-slate-100'>
                        Contest<span className='text-secondary'>Hub</span>
                    </span>
                </Link>

                {/* ── Desktop nav links ── */}
                <nav className='hidden lg:flex items-center gap-7'>
                    <ul className='flex items-center gap-7 text-[13.5px] list-none m-0 p-0'>
                        {links}
                    </ul>
                </nav>

                {/* ── Right side ── */}
                <div className='flex items-center gap-3'>

                    {/* Theme toggle — desktop */}
                    <div className='hidden lg:flex'>
                        <label className='swap swap-rotate cursor-pointer'>
                            <input
                                onChange={(e) => handleTheme(e.target.checked)}
                                type='checkbox'
                                className='theme-controller'
                                value='synthwave'
                                checked={theme === 'dark'}
                            />
                            {/* Sun */}
                            <svg className='swap-off h-[18px] w-[18px] fill-current text-slate-400 hover:text-slate-600' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                                <path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
                            </svg>
                            {/* Moon */}
                            <svg className='swap-on h-[18px] w-[18px] fill-current text-slate-400 hover:text-slate-200' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                                <path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
                            </svg>
                        </label>
                    </div>

                    {/* Auth buttons OR avatar */}
                    {user ? (
                        <div className='relative' ref={dropdownRef}>
                            <button
                                onClick={() => setOpen(!open)}
                                className='flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50'
                            >
                                <img
                                    src={user?.photoURL}
                                    alt='User'
                                    className='w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700 hover:ring-secondary/50 transition-all duration-150'
                                />
                            </button>

                            {/* Dropdown */}
                            {open && (
                                <div className='absolute right-0 top-[calc(100%+10px)] w-64 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg shadow-slate-900/10 dark:shadow-black/30 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150'>

                                    {/* User info */}
                                    <div className='px-4 pt-4 pb-3 border-b border-slate-100 dark:border-slate-700'>
                                        <div className='flex items-center gap-3'>
                                            <img
                                                src={user?.photoURL}
                                                alt=''
                                                className='w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700'
                                            />
                                            <div className='min-w-0'>
                                                <p className='text-[13px] font-semibold text-slate-900 dark:text-slate-100 truncate'>{user?.displayName}</p>
                                                <p className='text-[11px] text-slate-400 dark:text-slate-500 truncate'>{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu items */}
                                    <div className='p-1.5'>
                                        <Link
                                            to='/dashboard/daynamicNavigate'
                                            onClick={() => setOpen(false)}
                                            className='flex items-center gap-2.5 w-full px-3 py-2 text-[13px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors'
                                        >
                                            <svg className='w-4 h-4 text-slate-400' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}>
                                                <path strokeLinecap='round' strokeLinejoin='round' d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' />
                                            </svg>
                                            Dashboard
                                        </Link>

                                        <div className='border-t border-slate-100 dark:border-slate-700 mt-1 pt-1'>
                                            <button
                                                onClick={handleSignOut}
                                                className='flex items-center gap-2.5 w-full px-3 py-2 text-[13px] font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors'
                                            >
                                                <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}>
                                                    <path strokeLinecap='round' strokeLinejoin='round' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                                                </svg>
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='hidden md:flex items-center gap-2'>
                            <Link
                                to='login'
                                className='px-4 py-1.5 text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:text-secondary dark:hover:text-secondary border border-slate-200 dark:border-slate-700 rounded-lg hover:border-secondary/40 transition-all duration-150'
                            >
                                Login
                            </Link>
                            <Link
                                to='register'
                                className='px-4 py-1.5 text-[13px] font-semibold text-white bg-secondary hover:bg-indigo-600 rounded-lg transition-colors duration-150 shadow-sm shadow-indigo-500/20'
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}

                    {/* Mobile hamburger — opens slide drawer */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        className='lg:hidden btn btn-ghost btn-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        aria-label='Open menu'
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
                        </svg>
                    </button>
                </div>
            </div>

            {/* ─────────── MOBILE SLIDE DRAWER ─────────── */}

            {/* Overlay */}
            <div
                onClick={() => setMobileOpen(false)}
                className={`lg:hidden fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
                    mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            />

            {/* Drawer panel */}
            <aside
                className={`lg:hidden fixed top-0 right-0 z-[70] h-full w-[80%] max-w-xs bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
                    mobileOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Drawer header */}
                <div className='flex items-center justify-between px-5 h-16 border-b border-slate-100 dark:border-slate-800'>
                    <Link
                        to='/'
                        onClick={() => setMobileOpen(false)}
                        className='flex items-center gap-2'
                    >
                        <span className='w-8 h-8 bg-secondary rounded-lg flex items-center justify-center shadow-sm'>
                            <GoTrophy size={16} className='text-white' />
                        </span>
                        <span className='text-[15px] font-bold tracking-tight text-primary dark:text-slate-100'>
                            Contest<span className='text-secondary'>Hub</span>
                        </span>
                    </Link>

                    <button
                        onClick={() => setMobileOpen(false)}
                        className='p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                        aria-label='Close menu'
                    >
                        <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>
                </div>

                {/* User info (if logged in) */}
                {user && (
                    <div className='px-5 py-4 border-b border-slate-100 dark:border-slate-800'>
                        <div className='flex items-center gap-3'>
                            <img
                                src={user?.photoURL}
                                alt=''
                                className='w-11 h-11 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700'
                            />
                            <div className='min-w-0'>
                                <p className='text-sm font-semibold text-slate-900 dark:text-slate-100 truncate'>{user?.displayName}</p>
                                <p className='text-xs text-slate-400 dark:text-slate-500 truncate'>{user?.email}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Nav links */}
                <nav className='flex-1 overflow-y-auto px-3 py-4'>
                    <ul className='space-y-1 list-none m-0 p-0'>
                        <li><NavLink onClick={() => setMobileOpen(false)} className={mobileLinkClass} to='/'>Home</NavLink></li>
                        <li><NavLink onClick={() => setMobileOpen(false)} className={mobileLinkClass} to='/all-contest'>All Contest</NavLink></li>
                        <li><NavLink onClick={() => setMobileOpen(false)} className={mobileLinkClass} to='/leaderboard'>Leaderboard</NavLink></li>
                        <li><NavLink onClick={() => setMobileOpen(false)} className={mobileLinkClass} to='/about'>About</NavLink></li>
                        <li><NavLink onClick={() => setMobileOpen(false)} className={mobileLinkClass} to='/contact'>Contact</NavLink></li>

                        {user && (
                            <li>
                                <Link
                                    onClick={() => setMobileOpen(false)}
                                    className='block w-full px-4 py-3 rounded-lg text-[15px] font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                                    to='/dashboard/daynamicNavigate'
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>

                {/* Footer: theme toggle + auth actions */}
                <div className='border-t border-slate-100 dark:border-slate-800 p-4 space-y-3'>
                    {/* Theme toggle row */}
                    <div className='flex items-center justify-between px-1'>
                        <span className='text-sm font-medium text-slate-600 dark:text-slate-300'>Dark mode</span>
                        <label className='swap swap-rotate cursor-pointer'>
                            <input
                                onChange={(e) => handleTheme(e.target.checked)}
                                type='checkbox'
                                className='theme-controller'
                                value='synthwave'
                                checked={theme === 'dark'}
                            />
                            <svg className='swap-off h-5 w-5 fill-current text-slate-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                                <path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
                            </svg>
                            <svg className='swap-on h-5 w-5 fill-current text-slate-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                                <path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
                            </svg>
                        </label>
                    </div>

                    {/* Auth actions */}
                    {user ? (
                        <button
                            onClick={handleSignOut}
                            className='flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors'
                        >
                            <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                            </svg>
                            Sign out
                        </button>
                    ) : (
                        <div className='flex gap-2'>
                            <Link
                                to='login'
                                onClick={() => setMobileOpen(false)}
                                className='flex-1 text-center px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-secondary/40 hover:text-secondary transition-colors'
                            >
                                Login
                            </Link>
                            <Link
                                to='register'
                                onClick={() => setMobileOpen(false)}
                                className='flex-1 text-center px-4 py-2.5 text-sm font-semibold text-white bg-secondary hover:bg-indigo-600 rounded-lg transition-colors'
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </aside>
        </header>
    );
};

export default Navbar;