import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Building, Hammer } from 'lucide-react';

const BACKGROUND_IMAGES = [
  `${import.meta.env.BASE_URL}landing-hero-new-1.webp`,
  `${import.meta.env.BASE_URL}landing-hero-new-2.webp`,
  `${import.meta.env.BASE_URL}landing-hero-new-3.webp`,
  `${import.meta.env.BASE_URL}landing-hero-new-4.webp`,
  `${import.meta.env.BASE_URL}landing-hero-new-5.webp`,
  `${import.meta.env.BASE_URL}landing-hero-new-6.webp`
];

const GatewayMobile = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-start relative overflow-hidden font-sans selection:bg-blue-500/30 px-3 sm:px-4 py-6 sm:py-8">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.45, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${BACKGROUND_IMAGES[currentImageIndex]})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/65 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0,rgba(0,0,0,0)_75%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="z-10 text-center mb-5 sm:mb-6 relative flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center gap-1.5 mb-2.5 sm:mb-3 group">
          <motion.img
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            src={`${import.meta.env.BASE_URL}mano-logo.svg`}
            alt="Mano Consultants"
            className="h-10 sm:h-11 w-auto drop-shadow-[0_0_20px_rgba(59,130,246,0.45)]"
          />
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="text-[1.7rem] sm:text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500"
          >
            MANO
          </motion.span>
        </div>

        <h1 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 text-gray-200 tracking-wide">Select Your Division</h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '44px' }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full mb-1.5 sm:mb-2"
        />
        <p className="text-gray-400 max-w-[17rem] sm:max-w-[18rem] mx-auto text-[11px] sm:text-xs font-light">
          Choose the specific vertical to explore our specialized services.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 w-full max-w-[22rem] sm:max-w-md z-10 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25, ease: 'easeOut' }}
          className="w-full relative group h-[260px] sm:h-[290px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl"
        >
          <Link to="/pmc" className="block w-full h-full relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            </div>

            <div className="absolute bottom-2 left-2 right-2 p-3 sm:p-4 h-[132px] sm:h-[145px] flex flex-col justify-center rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-1 leading-tight">MANO PMC</h2>
                  <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed mb-2 sm:mb-3 opacity-90 line-clamp-2">
                    Project Management Consultants (PMC), Cost Consultancy, and auditing services.
                  </p>
                  <div className="flex items-center text-white text-[11px] sm:text-xs font-semibold">
                    Explore Service <ArrowRight className="ml-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35, ease: 'easeOut' }}
          className="w-full relative group h-[260px] sm:h-[290px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl"
        >
          <Link to="/epc" className="block w-full h-full relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            </div>

            <div className="absolute bottom-2 left-2 right-2 p-3 sm:p-4 h-[132px] sm:h-[145px] flex flex-col justify-center rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-600 flex items-center justify-center shrink-0 shadow-lg">
                  <Hammer className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-1 leading-tight">MANO EPC</h2>
                  <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed mb-2 sm:mb-3 opacity-90 line-clamp-2">
                    Specialized Engineering, Procurement, and Construction (EPC) solutions.
                  </p>
                  <div className="flex items-center text-white text-[11px] sm:text-xs font-semibold">
                    Explore Service <ArrowRight className="ml-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default GatewayMobile;
