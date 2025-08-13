import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import type { RootState } from '@/store';
import { setMenuOpen } from '@/store/appSlice';
import type { MenuItem } from '@/types';

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
      className="fixed left-0 top-0 h-screen bg-black/90 backdrop-blur-md z-50 overflow-hidden flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ width: 80 }}
      animate={{ width: isMenuOpen ? 280 : 80 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute inset-0 bg-black/80 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col py-5 pt-28">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="px-5 pb-5 border-b border-white/10 mb-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                  <img src="/assets/icons/avatar.png" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="text-white text-base font-medium">Daniel</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="flex-1 flex flex-col gap-2">
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 min-h-12 hover:bg-white/8 ${
                item.id === 'home' ? 'bg-[#3b486d]' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={item.icon} alt={item.label} className="w-6 h-6 object-contain flex-shrink-0" />
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.span
                    className="text-white text-sm font-medium whitespace-nowrap"
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
              className="p-5 border-t border-white/10 mt-auto text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <div className="text-white/70 text-lg font-medium py-2 cursor-pointer transition-colors duration-200 hover:text-white">LANGUAGE</div>
              <div className="text-white/70 text-lg font-medium py-2 cursor-pointer transition-colors duration-200 hover:text-white">GET HELP</div>
              <div className="text-white/70 text-lg font-medium py-2 cursor-pointer transition-colors duration-200 hover:text-white">EXIT</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Sidebar;
