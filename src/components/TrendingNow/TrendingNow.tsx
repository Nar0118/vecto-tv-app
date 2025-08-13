import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import type { RootState } from '@/store';
import { selectVideo, setVideoPlaying } from '@/store/appSlice';
import type { Video } from '@/types';
import { saveToSessionStorage } from '@/utils';

const TrendingNow: React.FC = () => {
  const dispatch = useDispatch();
  const trendingVideos = useSelector((state: RootState) => state.app.trendingVideos);
  const lastClickedVideoId = useSelector((state: RootState) => state.app.lastClickedVideoId);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleVideoClick = (video: Video) => {
    dispatch(selectVideo(video));
    saveToSessionStorage('lastClickedVideoId', video.Id);
    // Autoplay after 2 seconds
    setTimeout(() => dispatch(setVideoPlaying(true)), 2000);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const scrollToDirection = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const scrollAmount = 300;
    const currentScroll = carouselRef.current.scrollLeft;
    const newScroll = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;
    
    carouselRef.current.scrollTo({
      left: newScroll,
      behavior: 'smooth'
    });
  };

  if (!trendingVideos.length) {
    return (
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-6">Trending Now</h2>
        <div className="flex items-center justify-center h-[300px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6 md:flex-row flex-col md:items-start md:gap-4">
        <h2 className="text-3xl font-bold text-white md:text-2xl">Trending Now</h2>
        <div className="flex gap-3 md:self-end">
          <button
            className="w-10 h-10 border-none rounded-full bg-white/10 text-white cursor-pointer flex items-center justify-center transition-all duration-200 backdrop-blur-md hover:bg-white/20 hover:scale-105 active:scale-95"
            onClick={() => scrollToDirection('left')}
            aria-label="Scroll left"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button
            className="w-10 h-10 border-none rounded-full bg-white/10 text-white cursor-pointer flex items-center justify-center transition-all duration-200 backdrop-blur-md hover:bg-white/20 hover:scale-105 active:scale-95"
            onClick={() => scrollToDirection('right')}
            aria-label="Scroll right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto overflow-y-hidden py-2 scroll-smooth scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {trendingVideos.slice(0, 50).map((video, index) => (
          <motion.div
            key={video.Id}
            className={`flex-shrink-0 w-48 cursor-pointer rounded-lg overflow-hidden relative transition-transform duration-200 md:w-36 ${
              lastClickedVideoId === video.Id ? 'border-2 border-blue-500 shadow-[0_0_20px_rgba(0,123,255,0.5)]' : ''
            }`}
            onClick={() => handleVideoClick(video)}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
          >
            <div className="relative w-full h-[300px] overflow-hidden rounded-lg md:h-[225px]">
              <img
                src={`/assets/${video.CoverImage}`}
                alt={video.Title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <div className="text-white">
                  <h3 className="text-sm font-semibold mb-2 leading-tight">{video.Title}</h3>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <span>{video.ReleaseYear}</span>
                    <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs font-semibold">
                      {video.MpaRating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNow;
