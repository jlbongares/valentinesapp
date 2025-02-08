import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import gsap from "gsap";

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

  const textRef = useRef(null);

  // Handle text transitions automatically
  useEffect(() => {
    if (textStage === 1) {
      setTimeout(() => setTextStage(2), 3000);
    } else if (textStage === 2) {
      setTimeout(() => {
        gsap.to(textRef.current, {
          scale: 1.2,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        });

        setTimeout(() => {
          gsap.to(textRef.current, {
            scale: 3,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              setFadeOut(true);
              setShowVideo(true);
            }
          });
        }, 1000);
      }, 2000);
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
          <motion.h1
            key={textStage}
            ref={textRef}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: fadeOut ? 0 : 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text pb-8 text-center"
          >
            {textStage === 0
              ? "Will you be my Valentine?"
              : textStage === 1
              ? "She said yes!!!"
              : textStage === 2
              ? "Let me sing this song for you."
              : ""}
          </motion.h1>

          {/* Buttons (Only show before clicking Yes) */}
          {textStage === 0 && (
            <div className="mt-6 flex flex-col sm:flex-row sm:gap-[5vw] space-y-4 sm:space-y-0 sm:space-x-6 gap-[7vw]">
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
            src="video/cover.mp4"
            controls
            autoPlay
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
          ></video>
        </motion.div>
      )}
    </main>
  );
};

export default App;
