import React from 'react';
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


  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-secondary">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
          <div className="px-4 text-primary font-semibold">Navbar Title</div>
        </nav>
        {/* OUTLET */}
        <div className='bg-[#D1F5F3] dark:bg-gray-800 min-h-screen '>
          <Outlet />

        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible text-xl font-medium text-primary">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-secondary is-drawer-close:w-14 is-drawer-open:w-64 border-r-2 border-primary">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}

             <li>
              <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                {/* Home icon */}
                <GoTrophy />
                <span className="is-drawer-close:hidden text-xl font-bold">Contest<span className='text-yellow-500'>H</span>ub</span>
              </Link>
            </li>

            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                {/* Home icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </button>
            </li>

            {/* -------  USER DASHBOARD SECTION LIST START -------- */}

            {
              role === 'user' &&
              <>
                <li>
                  <NavLink to='my_participated_contests' className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-[#0a3d62] text-white" : ""
                    }`
                  } data-tip="My Participated Contests">
                    {/* Add Contest */}
                    <RiPresentationFill size={22} />
                    <span className="is-drawer-close:hidden">My Participated Contests</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to='my_winning_contests' className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-[#0a3d62] text-white" : ""
                    }`
                  } data-tip="My Winning Contests">
                    {/* Add Contest */}
                    <GiTightrope size={22} />
                    <span className="is-drawer-close:hidden">My Winning Contests</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to='user-profile' className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-[#0a3d62] text-white" : ""
                    }`
                  } data-tip="My Profile">
                    {/* Add Contest */}
                    <FaUserCircle size={22} />
                    <span className="is-drawer-close:hidden">My Profile</span>
                  </NavLink>
                </li>
              </>
            }


            {/* -------  USER DASHBOARD SECTION LIST END -------- */}



            {/* ------------------------------------------xxxxxxx---------------------------------------- */}




            {/* -------  CONTEST CREATOR DASHBOARD SECTION LIST START -------- */}

            {role === 'creator' &&

              <>
                <li>
                  <NavLink to='add-contest' className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-[#0a3d62] text-white" : ""
                    }`
                  } data-tip="Add Contest">
                    {/* Add Contest */}
                    <MdOutlinePostAdd size={22} />
                    <span className="is-drawer-close:hidden">Add Contest</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to='my-contest' className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-[#0a3d62] text-white" : ""
                    }`
                  } data-tip="My Created Contests">
                    {/* My Created Contests */}
                    <FaRegFolderOpen size={22} />
                    <span className="is-drawer-close:hidden">My Created Contests</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to='submitted-task' className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-[#0a3d62] text-white" : ""
                    }`
                  } data-tip="Submitted Tasks">
                    {/* Submitted Tasks */}
                    <GrTask size={22} />
                    <span className="is-drawer-close:hidden">Submitted Tasks</span>
                  </NavLink>
                </li>
              </>

            }

            {/* -------  CONTEST CREATOR DASHBOARD SECTION LIST END -------- */}



            {/* ------------------------------------------xxxxxxx---------------------------------------- */}

            {/* -------  ADMIN DASHBOARD SECTION LIST START -------- */}

            {role === 'admin' &&
              <>
                <li>
                  <NavLink to='manage_users' className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-[#0a3d62] text-white" : ""
                    }`
                  } data-tip="Manage Users">
                    {/* Add Contest */}
                    <FaUsersGear size={22} />
                    <span className="is-drawer-close:hidden">Manage Users</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to='manage-contests ' className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-[#0a3d62] text-white" : ""
                    }`
                  } data-tip="Manage Contest">
                    {/* Add Contest */}
                    <MdOutlineManageHistory size={22} />
                    <span className="is-drawer-close:hidden">Manage Contest</span>
                  </NavLink>
                </li>
              </>
            }

            {/* -------  ADMIN DASHBOARD SECTION LIST START -------- */}

            {/* List item */}
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                {/* Settings icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboradLayouts;