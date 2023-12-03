import { Icons } from '@/assets/icons/Icons';
import { motion } from 'framer-motion';

const LoaderScreen = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariant}
      className="container mx-auto h-screen   flex flex-col justify-center items-center gap-3"
    >
      <div className="max-h-[400px]">
        <Icons.logoICon className=" h-full w-full " />
      </div>
    </motion.div>
  );
};

export default LoaderScreen;

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  exit: {
    x: '-100vh',
    transition: {
      ease: 'easeInOut',
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      type: 'spring',
      stiffness: 80,
    },
  },
};
