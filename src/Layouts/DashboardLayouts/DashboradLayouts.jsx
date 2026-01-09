import React, { useEffect, useState } from 'react';
import { FaRegFolderOpen, FaUserCircle } from 'react-icons/fa';
import { MdCoPresent, MdOutlineManageHistory, MdOutlinePostAdd } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router';
import UseRole from '../../Hook/UseRole';
import { GrTask } from 'react-icons/gr';
import { RiFileEditFill, RiPresentationFill } from 'react-icons/ri';
import { GiTightrope } from 'react-icons/gi';
import { FaUsersGear } from 'react-icons/fa6';
import { GoTrophy } from 'react-icons/go';

const DashboradLayouts = () => {

  const { role, roleLoading } = UseRole()

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? 'dark' : 'light')
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        
        {/* Navbar */}
        <nav className="navbar w-full bg-gradient-to-r from-secondary to-secondary/80 dark:from-secondary dark:to-secondary/90 shadow-lg">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost hover:bg-white/10 text-white">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-5 text-white">
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 font-bold text-white text-lg">Dashboard</div>

          {/* theme section */}
          <div className='ml-auto'>
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input onChange={(e) => handleTheme(e.target.checked)} type="checkbox" className="theme-controller" value="synthwave" />

              {/* sun icon */}
              <svg
                className="swap-off h-10 w-10 fill-current text-accent"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                  d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on h-10 w-10 fill-current text-accent"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                  d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </nav>

        {/* OUTLET */}
        <div className='bg-white dark:bg-gray-900 min-h-screen'>
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-gradient-to-b from-secondary to-secondary/90 dark:from-secondary dark:to-secondary/80 w-64 border-r-2 border-secondary/20">
          
          {/* Sidebar content here */}
          <ul className="menu w-full grow text-white font-medium">
            
            {/* Logo Item */}
            <li className="mt-2 mb-4">
              <Link to='/' className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors duration-300">
                <GoTrophy size={28} className="text-accent" />
                <span className="text-xl font-bold">
                  Contest<span className='text-accent'>H</span>ub
                </span>
              </Link>
            </li>

            {/* Divider */}
            <li><div className="divider my-2 before:bg-white/20 after:bg-white/20"></div></li>

            {/* -------  USER DASHBOARD SECTION LIST START -------- */}
            {role === 'user' && (
              <>
                <li>
                  <NavLink 
                    to='my_participated_contests' 
                    className={({ isActive }) =>
                      `rounded-lg transition-all duration-300 ${
                        isActive 
                          ? "bg-white/20 font-bold text-accent border-l-4 border-accent" 
                          : "hover:bg-white/10"
                      }`
                    }
                  >
                    <RiPresentationFill size={22} />
                    <span>My Participated Contests</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to='my_winning_contests' 
                    className={({ isActive }) =>
                      `rounded-lg transition-all duration-300 ${
                        isActive 
                          ? "bg-white/20 font-bold text-accent border-l-4 border-accent" 
                          : "hover:bg-white/10"
                      }`
                    }
                  >
                    <GiTightrope size={22} />
                    <span>My Winning Contests</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to='user-profile' 
                    className={({ isActive }) =>
                      `rounded-lg transition-all duration-300 ${
                        isActive 
                          ? "bg-white/20 font-bold text-accent border-l-4 border-accent" 
                          : "hover:bg-white/10"
                      }`
                    }
                  >
                    <FaUserCircle size={22} />
                    <span>My Profile</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* -------  USER DASHBOARD SECTION LIST END -------- */}

            {/* -------  CONTEST CREATOR DASHBOARD SECTION LIST START -------- */}
            {role === 'creator' && (
              <>
                <li>
                  <NavLink 
                    to='add-contest' 
                    className={({ isActive }) =>
                      `rounded-lg transition-all duration-300 ${
                        isActive 
                          ? "bg-white/20 font-bold text-accent border-l-4 border-accent" 
                          : "hover:bg-white/10"
                      }`
                    }
                  >
                    <MdOutlinePostAdd size={22} />
                    <span>Add Contest</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to='my-contest' 
                    className={({ isActive }) =>
                      `rounded-lg transition-all duration-300 ${
                        isActive 
                          ? "bg-white/20 font-bold text-accent border-l-4 border-accent" 
                          : "hover:bg-white/10"
                      }`
                    }
                  >
                    <FaRegFolderOpen size={22} />
                    <span>My Created Contests</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to='submitted-task' 
                    className={({ isActive }) =>
                      `rounded-lg transition-all duration-300 ${
                        isActive 
                          ? "bg-white/20 font-bold text-accent border-l-4 border-accent" 
                          : "hover:bg-white/10"
                      }`
                    }
                  >
                    <GrTask size={22} />
                    <span>Submitted Tasks</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* -------  CONTEST CREATOR DASHBOARD SECTION LIST END -------- */}

            {/* -------  ADMIN DASHBOARD SECTION LIST START -------- */}
            {role === 'admin' && (
              <>
                <li>
                  <NavLink 
                    to='manage_users' 
                    className={({ isActive }) =>
                      `rounded-lg transition-all duration-300 ${
                        isActive 
                          ? "bg-white/20 font-bold text-accent border-l-4 border-accent" 
                          : "hover:bg-white/10"
                      }`
                    }
                  >
                    <FaUsersGear size={22} />
                    <span>Manage Users</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to='manage-contests' 
                    className={({ isActive }) =>
                      `rounded-lg transition-all duration-300 ${
                        isActive 
                          ? "bg-white/20 font-bold text-accent border-l-4 border-accent" 
                          : "hover:bg-white/10"
                      }`
                    }
                  >
                    <MdOutlineManageHistory size={22} />
                    <span>Manage Contest</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* -------  ADMIN DASHBOARD SECTION LIST END -------- */}

            {/* Divider */}
            <li><div className="divider my-2 before:bg-white/20 after:bg-white/20"></div></li>

            {/* Settings */}
            <li>
              <button className="rounded-lg hover:bg-white/10 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-5">
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboradLayouts;