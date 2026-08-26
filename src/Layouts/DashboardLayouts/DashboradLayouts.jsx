import React, { useEffect, useState } from 'react';
import { FaRegFolderOpen, FaUserCircle, FaTrophy } from 'react-icons/fa';
import { MdOutlineManageHistory, MdOutlinePostAdd, MdMenu } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router';
import UseRole from '../../Hook/UseRole';
import { GrTask } from 'react-icons/gr';
import { RiPresentationFill } from 'react-icons/ri';
import { GiTightrope } from 'react-icons/gi';
import { FaUsersGear } from 'react-icons/fa6';
import { FiSettings, FiMoon, FiSun } from 'react-icons/fi';

const DashboardLayouts = () => {
  const { role, roleLoading } = UseRole();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    html.classList.toggle('dark', theme === 'dark');
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Navigation configuration
  const navigationItems = {
    user: [
      { to: 'my_participated_contests', icon: RiPresentationFill, label: 'My Participated Contests' },
      { to: 'my_winning_contests', icon: GiTightrope, label: 'My Winning Contests' },
      { to: 'user-profile', icon: FaUserCircle, label: 'My Profile' },
    ],
    creator: [
      { to: 'add-contest', icon: MdOutlinePostAdd, label: 'Add Contest' },
      { to: 'my-contest', icon: FaRegFolderOpen, label: 'My Created Contests' },
      { to: 'submitted-task', icon: GrTask, label: 'Submitted Tasks' },
    ],
    admin: [
      { to: 'manage_users', icon: FaUsersGear, label: 'Manage Users' },
      { to: 'manage-contests', icon: MdOutlineManageHistory, label: 'Manage Contests' },
    ],
  };

  const getNavItems = () => {
    if (roleLoading) return [];
    return navigationItems[role] || [];
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between px-4 h-16">
            <div className="flex items-center gap-4">
              <label 
                htmlFor="dashboard-drawer" 
                className="btn btn-square btn-ghost lg:hidden border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                <MdMenu className="text-xl" />
              </label>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">Dashboard</h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" className="drawer-overlay lg:hidden bg-gray-900/50 dark:bg-black/70"></label>
        
        <aside className="w-64 min-h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300">
          {/* Logo Section */}
          <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700 transition-colors">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                <FaTrophy className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                Contest<span className="text-blue-600 dark:text-blue-400">H</span>ub
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            {roleLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-5 h-5 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Main Menu */}
                <div>
                  <h3 className="px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    Menu
                  </h3>
                  <ul className="space-y-1">
                    {getNavItems().map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                              isActive
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200 border border-transparent'
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <item.icon className={`text-lg ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} />
                              <span>{item.label}</span>
                            </>
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Settings Section */}
                {getNavItems().length > 0 && (
                  <div>
                    <h3 className="px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                      Preferences
                    </h3>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                      <FiSettings className="text-lg text-gray-400 dark:text-gray-500" />
                      <span>Settings</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 transition-colors">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              © 2024 ContestHub
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayouts;