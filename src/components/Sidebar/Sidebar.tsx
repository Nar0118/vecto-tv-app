import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import type { RootState } from '@/store';
import { setMenuOpen } from '@/store/appSlice';
import type { MenuItem } from '@/types';
import './Sidebar.css';

const menuItems: MenuItem[] = [
  { id: 'search', label: 'Search', icon: '/assets/icons/ICON - Search.png', path: '/search' },
  { id: 'home', label: 'Home', icon: '/assets/icons/Group 46.png', path: '/' },
  { id: 'tv-shows', label: 'TV Shows', icon: '/assets/icons/Group 47.png', path: '/tv-shows' },
  { id: 'movies', label: 'Movies', icon: '/assets/icons/Group 53.png', path: '/movies' },
  { id: 'genres', label: 'Genres', icon: '/assets/icons/Group 54.png', path: '/genres' },
  { id: 'watch-later', label: 'Watch Later', icon: '/assets/icons/Group 56.png', path: '/watch-later' },
];

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state: RootState) => state.app.isMenuOpen);

  const handleMouseEnter = () => {
    dispatch(setMenuOpen(true));
  };

  const handleMouseLeave = () => {
    dispatch(setMenuOpen(false));
  };

  return (
    <motion.div
      className="sidebar"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ width: 80 }}
      animate={{ width: isMenuOpen ? 280 : 80 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <div className="sidebar-content">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="profile-section"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <div className="profile-info">
                <div className="profile-avatar">
                  <img src="/assets/icons/avatar.png" alt="Profile" />
                </div>
                <span className="profile-name">Daniel</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="nav-menu">
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              className={`nav-item ${item.id === 'home' ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={item.icon} alt={item.label} className="nav-icon" />
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.span
                    className="nav-label"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="additional-menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <div className="additional-item">LANGUAGE</div>
              <div className="additional-item">GET HELP</div>
              <div className="additional-item">EXIT</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Sidebar;
