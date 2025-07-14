import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SecretCodeModal from '../pages/SecretCodeModal';

const NavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [birthdayId, setBirthdayId] = useState(null);
  const [fromStartPage, setFromStartPage] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem('birthdayId');
    const fromStart = localStorage.getItem('fromStartPage') === 'true';

    console.log('🎈 Loaded from localStorage:', storedId);
    if (storedId) setBirthdayId(storedId);
    setFromStartPage(fromStart);
  }, [pathname]); // re-check on route change

  const navItems = [
    { path: '/', label: 'Information', showIfStartOnly: true },
    { path: '/welcome', label: 'Welcome' },
    { path: '/memories', label: 'Memories' },
    { path: '/loveStory', label: 'Timeline' },
    { label: 'Special', isModal: true },
  ];

  const generatePath = (basePath) => {
    if (birthdayId && basePath !== '/') return `${basePath}/${birthdayId}`;
    return basePath;
  };

  const isActive = (navPath) => pathname.startsWith(navPath);

  const linkStyle = (isActive) =>
    `px-4 py-2 rounded-md font-medium transition-all duration-200 ${
      isActive
        ? 'bg-pink-500 text-white shadow-sm'
        : 'text-pink-700 hover:bg-pink-100 hover:text-pink-900'
    }`;

  const handleLogout = () => {
    localStorage.removeItem('birthdayId');
    localStorage.removeItem('fromStartPage');
    setBirthdayId(null);
    setFromStartPage(false);
    navigate('/');
  };

  return (
    <>
      <nav className="bg-pink-50 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-pink-600 tracking-wide">
            🎉 Birthday Surprise
          </div>

          <div className="space-x-2 sm:space-x-4 flex items-center">
            {navItems.map(({ path, label, isModal, showIfStartOnly }) => {
              const isBirthdayRoute = path !== '/';

              // ⛔ Hide "Information" if not from Start Page
              if (showIfStartOnly && !fromStartPage) return null;

              // ⛔ Hide routes that need birthdayId
              if (isBirthdayRoute && !birthdayId) return null;

              return isModal ? (
                <button
                  key={label}
                  onClick={() => setShowModal(true)}
                  className={linkStyle(false)}
                >
                  {label}
                </button>
              ) : (
                <Link
                  key={path}
                  to={generatePath(path)}
                  className={linkStyle(isActive(path))}
                >
                  {label}
                </Link>
              );
            })}

            {birthdayId && (
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 rounded-md font-medium bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <SecretCodeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUnlock={() => {
          setShowModal(false);
          const id = localStorage.getItem('birthdayId');
          if (id) navigate(`/special/${id}`);
        }}
      />
    </>
  );
};

export default NavBar;
