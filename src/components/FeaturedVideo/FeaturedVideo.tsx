import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import type { RootState } from '@/store';
import { setVideoPlaying } from '@/store/appSlice';
import { formatDuration } from '@/utils';

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
      <div className="relative w-full h-[600px] overflow-hidden rounded-2xl mb-10 bg-black">
        <div className="w-full h-full flex items-center justify-center bg-black">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-2xl mb-10 bg-black">
      <AnimatePresence mode="wait">
        {isVideoPlaying && resolvedVideoUrl ? (
          <motion.div
            key="video-background"
            className="relative"
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
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/20"></div>
          </motion.div>
        ) : (
          <motion.div
            key="image-background"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ backgroundImage: `url(/assets/${featuredVideo.CoverImage})` }}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center p-5">
        <motion.div
          className="max-w-2xl text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
            {featuredVideo.Category}
          </div>
          {featuredVideo.TitleImage ? (
            <img
              className="w-full max-w-[560px] h-auto mb-4 drop-shadow-2xl"
              src={`/assets/${featuredVideo.TitleImage}`}
              alt={featuredVideo.Title}
            />
          ) : (
            <h1 className="text-6xl font-extrabold mb-4 leading-tight">
              {featuredVideo.Title}
            </h1>
          )}
          <div className="flex items-center gap-4 mb-4 text-sm text-white/90">
            <span>{featuredVideo.ReleaseYear}</span>
            <span className="bg-white/18 px-2 py-1 rounded text-xs font-bold">
              {featuredVideo.MpaRating}
            </span>
            <span>{formatDuration(featuredVideo.Duration)}</span>
          </div>
          <p className="text-base leading-relaxed text-white/92 mb-7 max-w-lg">
            {featuredVideo.Description}
          </p>
          
          <div className="flex gap-4">
            <motion.button
              className="flex items-center gap-2.5 px-8 py-2.5 rounded-full text-base font-bold cursor-pointer bg-white text-black hover:bg-white/90 disabled:opacity-55 disabled:cursor-not-allowed"
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
              className="flex items-center gap-2.5 px-8 py-2.5 rounded-full text-base font-bold cursor-pointer bg-primary text-white hover:bg-primary-hover"
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
