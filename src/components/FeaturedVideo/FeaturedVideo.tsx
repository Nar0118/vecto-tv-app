import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import type { RootState } from '@/store';
import { setVideoPlaying } from '@/store/appSlice';
import { formatDuration } from '@/utils';
import './FeaturedVideo.css';

const FeaturedVideo: React.FC = () => {
  const dispatch = useDispatch();
  const featuredVideo = useSelector((state: RootState) => state.app.featuredVideo);
  const trendingVideos = useSelector((state: RootState) => state.app.trendingVideos);
  const isVideoPlaying = useSelector((state: RootState) => state.app.isVideoPlaying);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Resolve a usable video URL from featured or a matching trending item
  const resolvedVideoUrl =
    (featuredVideo?.VideoUrl && featuredVideo.VideoUrl.length > 0
      ? featuredVideo.VideoUrl
      : trendingVideos.find((v) => v.Id === featuredVideo?.Id)?.VideoUrl) || '';

  useEffect(() => {
    if (isVideoPlaying && videoRef.current && resolvedVideoUrl) {
      videoRef.current.play().catch(() => dispatch(setVideoPlaying(false)));
    }
  }, [isVideoPlaying, resolvedVideoUrl, dispatch]);

  const handlePlayClick = () => {
    if (!resolvedVideoUrl) return;
    // Render video
    dispatch(setVideoPlaying(true));
    // Try to start playback as part of the gesture
    const tryPlay = () => {
      const el = videoRef.current;
      if (!el) {
        requestAnimationFrame(tryPlay);
        return;
      }
      el.muted = true;
      el.play().catch(() => {/* ignore and rely on effect */});
    };
    requestAnimationFrame(tryPlay);
  };

  if (!featuredVideo) {
    return (
      <div className="featured-video">
        <div className="featured-placeholder">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="featured-video">
      <AnimatePresence mode="wait">
        {isVideoPlaying && resolvedVideoUrl ? (
          <motion.div
            key="video-background"
            className="video-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <video
              ref={videoRef}
              src={resolvedVideoUrl}
              muted
              loop
              playsInline
              className="background-video"
            />
            <div className="video-overlay"></div>
          </motion.div>
        ) : (
          <motion.div
            key="image-background"
            className="image-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ backgroundImage: `url(/assets/${featuredVideo.CoverImage})` }}
          />
        )}
      </AnimatePresence>

      <div className="featured-content">
        <motion.div
          className="featured-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="featured-category">{featuredVideo.Category}</div>
          {featuredVideo.TitleImage ? (
            <img
              className="featured-title-image"
              src={`/assets/${featuredVideo.TitleImage}`}
              alt={featuredVideo.Title}
            />
          ) : (
            <h1 className="featured-title">{featuredVideo.Title}</h1>
          )}
          <div className="featured-metadata">
            <span>{featuredVideo.ReleaseYear}</span>
            <span className="rating">{featuredVideo.MpaRating}</span>
            <span>{formatDuration(featuredVideo.Duration)}</span>
          </div>
          <p className="featured-description">{featuredVideo.Description}</p>
          
          <div className="featured-actions">
            <motion.button
              className="play-button"
              onClick={handlePlayClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!resolvedVideoUrl}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
              Play
            </motion.button>
            
            <motion.button
              className="more-info-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              More Info
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedVideo;
