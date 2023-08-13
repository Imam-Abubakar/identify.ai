import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../utils/Transition';

import UserAvatar from '../images/user-avatar-32.png';

function DropdownProfile({
  align
}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img className="w-8 h-8 rounded-full" src="data:image/jpeg;base64,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" width="32" height="32" alt="User" />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">John Boyega</span>
          <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
            <div className="font-medium text-slate-800 dark:text-slate-100">John Boyega</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 italic">Administrator</div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
                to="/settings"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
                to="/signin"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default DropdownProfile;