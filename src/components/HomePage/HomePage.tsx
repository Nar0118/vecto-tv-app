import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setFeaturedVideo, setTrendingVideos } from '@/store/appSlice';
import { loadAppData, sortVideosByLastClicked, getFromSessionStorage, saveToSessionStorage } from '@/utils';
import Sidebar from '@/components/Sidebar/Sidebar';
import FeaturedVideo from '@/components/FeaturedVideo/FeaturedVideo';
import TrendingNow from '@/components/TrendingNow/TrendingNow';
import './HomePage.css';

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
      className="homepage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar />
      <main className="main-content">
        <FeaturedVideo />
        <TrendingNow />
      </main>
    </motion.div>
  );
};

export default HomePage;
