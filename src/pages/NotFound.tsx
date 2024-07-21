// pages/NotFound.tsx
import { motion } from 'framer-motion';
import { Button } from "../components/ui/button";

function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-8">
          <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
            {/* Construction site animation */}
            <motion.rect
              x="20" y="150" width="160" height="30" fill="#FFD700"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <motion.polygon
              points="100,20 180,150 20,150" fill="#FF6347"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 1 }}
            />
            <motion.circle
              cx="100" cy="100" r="20" fill="#4169E1"
              initial={{ scale: 0 }}
              animate={{ scale: 1, y: [0, -20, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', delay: 1.5 }}
            />
          </svg>
        </motion.div>
        <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-4">
          404 - Page Not Found
        </motion.h1>
        <motion.p variants={itemVariants} className="text-xl mb-8">
          Oops! It looks like this page is under construction.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button asChild>
            <a href="/">Return to Home</a>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFound;