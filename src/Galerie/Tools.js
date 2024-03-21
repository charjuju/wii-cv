import { motion } from "framer-motion";

export const BackgroundColorAnimation = ({ children, colors }) => {
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const changeColor = () => {
    return {
      backgroundColor: getRandomColor(),
      transition: {
        duration: 0.5,
      },
    };
  };

  return (
    <motion.div
      style={{ width: "100%", height: "100%", position: "relative" }}
      animate={changeColor()}
    >
      {children}
    </motion.div>
  );
};

export const ScaleOnHover = ({ children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.div>
  );
};

export const BlinkAnimation = ({ children }) => {
  return (
    <motion.div
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
};

export const ZigZagAnimation = ({ children }) => {
  return (
    <motion.div
      animate={{ x: [-20, 20, -20] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
};

export const ContinuousRotation = ({ children }) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
};

export const ProgressiveZoom = ({ children }) => {
  return (
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export const LoopingMovement = ({ children }) => {
  return (
    <motion.div
      animate={{ x: [-20, 20, -20] }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
    >
      {children}
    </motion.div>
  );
};
