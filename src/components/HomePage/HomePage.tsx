import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setFeaturedVideo, setTrendingVideos } from '@/store/appSlice';
import { loadAppData, sortVideosByLastClicked, getFromSessionStorage, saveToSessionStorage } from '@/utils';
import Sidebar from '@/components/Sidebar/Sidebar';
import FeaturedVideo from '@/components/FeaturedVideo/FeaturedVideo';
import TrendingNow from '@/components/TrendingNow/TrendingNow';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const data = await loadAppData();
        const lastClickedId = getFromSessionStorage('lastClickedVideoId') as string | null;
        const sortedTrendingVideos = sortVideosByLastClicked(data.TendingNow, lastClickedId);
        
        dispatch(setFeaturedVideo(data.Featured));
        dispatch(setTrendingVideos(sortedTrendingVideos));
        
        if (lastClickedId) {
          saveToSessionStorage('lastClickedVideoId', lastClickedId);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();
  }, [dispatch]);

  return (
    <motion.div
      className="min-h-screen bg-black relative flex bg-gradient-radial"
      style={{
        backgroundImage: `
          radial-gradient(1200px 600px at 15% 10%, rgba(255,255,255,0.04) 0%, transparent 60%),
          radial-gradient(1200px 600px at 85% 90%, rgba(255,255,255,0.03) 0%, transparent 60%)
        `
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar />
      <main className="flex-1 ml-20 overflow-x-hidden md:ml-20 md:p-5 p-4">
        <FeaturedVideo />
        <TrendingNow />
      </main>
    </motion.div>
  );
};

export default HomePage;
