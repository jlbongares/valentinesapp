import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const App = () => {
  const [showFireworks, setShowFireworks] = useState(false);
  const [textStage, setTextStage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const [yesSize, setYesSize] = useState(1.6); // Yes button size
  const [noSize, setNoSize] = useState(1.6);   // No button size

  const [noClickCount, setNoClickCount] = useState(0);
  const noTexts = [
    "No",
    "Why??",
    "U being mean...",
    "Are you serious??",
    "I would be madddd",
    "Stop clicking Noo",
    "Pleaseeee",
    "Noooo",
    "Nooo"
  ];

  // Handle text transitions automatically
  useEffect(() => {
    if (textStage === 1) {
      setTimeout(() => setTextStage(2), 3000);
    } else if (textStage === 2) {
      // Transition to "Let me sing this song for you."
      setTimeout(() => setTextStage(3), 2000);
    } else if (textStage === 3) {
      setFadeOut(true);
      setTimeout(() => {
        setShowVideo(true); // Show video right after fade-out
      }, 1000); // Slightly after fade starts, ensuring smooth transition
    }
  }, [textStage]);

  const handleYesClick = () => {
    setShowFireworks(true);
    setTextStage(1); // Start transition sequence

    // Stop confetti after 3 seconds
    setTimeout(() => setShowFireworks(false), 3000);
  };

  const handleNoClick = () => {
    setNoSize(noSize > 0.3 ? noSize - 0.2 : 0); // Shrink No button
    setYesSize(yesSize + 0.2); // Grow Yes button

    // Update No button text based on the Click count
    setNoClickCount((prevCount) => (prevCount + 1) % noTexts.length);
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center w-screen bg-gray-900 text-white overflow-hidden relative">
      {showFireworks && <Confetti />}

      {!showVideo ? (
        <>
          {/* Smooth Text Transitions */}
          <motion.h1
            key={textStage}
            initial={{ opacity: 0, x: textStage === 3 ? 0 : -20 }}
            animate={{ opacity: fadeOut ? 0 : 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text pb-8"
          >
            {textStage === 0
              ? "Will you be my Valentine?"
              : textStage === 1
              ? "She said yes!!!"
              : textStage === 2
              ? "Let me sing this song for you."
              : ""
            }
          </motion.h1>

          {/* Buttons (Only show before clicking Yes) */}
          {textStage === 0 && (
            <div className="mt-6 flex justify-center gap-[7vw]">
              <motion.button
                className="!bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:!bg-blue-700 transition duration-300"
                animate={{ scale: yesSize }}
                onClick={handleYesClick}
              >
                Yes!!!😍
              </motion.button>
              <motion.button
                className="!bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:!bg-red-700 transition duration-300"
                onClick={handleNoClick}
                animate={{ scale: noSize }}
              >
                {noTexts[noClickCount]}🥺
              </motion.button>
            </div>
          )}
        </>
      ) : (
        // Video Fade-In Transition
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="w-full h-full flex items-center justify-center"
        >
          <video
            src="your-video-url.mp4"
            controls
            autoPlay
            className="w-4/5 rounded-lg shadow-lg"
          ></video>
        </motion.div>
      )}
    </main>
  );
};

export default App;
