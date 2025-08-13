import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import type { RootState } from '@/store';
import { selectVideo, setVideoPlaying } from '@/store/appSlice';
import type { Video } from '@/types';
import { saveToSessionStorage } from '@/utils';
import './TrendingNow.css';

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
      <div className="trending-now">
        <h2 className="trending-title">Trending Now</h2>
        <div className="trending-placeholder">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="trending-now">
      <div className="trending-header">
        <h2 className="trending-title">Trending Now</h2>
        <div className="trending-controls">
          <button
            className="scroll-button"
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
            className="scroll-button"
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
        className="trending-carousel"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {trendingVideos.slice(0, 50).map((video, index) => (
          <motion.div
            key={video.Id}
            className={`trending-item ${lastClickedVideoId === video.Id ? 'selected' : ''}`}
            onClick={() => handleVideoClick(video)}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
          >
            <div className="video-cover">
              <img
                src={`/assets/${video.CoverImage}`}
                alt={video.Title}
                loading="lazy"
              />
              <div className="video-overlay">
                <div className="video-info">
                  <h3 className="video-title">{video.Title}</h3>
                  <div className="video-meta">
                    <span>{video.ReleaseYear}</span>
                    <span className="rating">{video.MpaRating}</span>
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
