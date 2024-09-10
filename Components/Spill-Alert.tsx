import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import { motion } from 'framer-motion';
import styles from './SpillAlert.module.css'; // Import CSS module for styles

const SpillAlert: React.FC = () => {
  const [spillInfo, setSpillInfo] = useState<{ type: string; description: string } | null>(null);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    // Fetch spill info from API
    const fetchSpillInfo = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/spill-info'); // Replace with your API endpoint
        const data = await response.json();
        setSpillInfo(data);
      } catch (error) {
        console.error('Error fetching spill info:', error);
      }
    };

    fetchSpillInfo();
  }, []);

  // Handler for video end event
  const handleVideoEnded = () => {
    router.push('/rotating-earth'); // Redirect to RotatingEarthWithSatellite page
  };

  return (
    <div className={styles.alertContainer}>
      <div className={styles.videoWrapper}>
        <video
          src="/bg.mp4" // Replace with your video path
          className={styles.videoElement}
          muted
          autoPlay
          loop={false} // Ensure the video does not loop
          playsInline
          onEnded={handleVideoEnded} // Add the event handler
        />
      </div>
      {spillInfo ? (
        <motion.div
          className="fixed left-6 bottom-5 transform -translate-y-1/2 flex flex-col items-center z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            className="text-white text-center mb-2"
            initial={{ y: 0 }}
            animate={{ y: 10 }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            ↓
          </motion.div>
          <motion.div
            className={`text-white tracking-widest ${styles.alertText}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {spillInfo.type} Spill Detected!
          </motion.div>
          <div className="text-white mt-2">
            {spillInfo.description}
          </div>
        </motion.div>
      ) : (
        <div className="text-white text-center mt-10">Loading spill information...</div>
      )}
    </div>
  );
};

export default SpillAlert;
