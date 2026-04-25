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

const GatewayTablet = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-blue-500/30">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.5, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${BACKGROUND_IMAGES[currentImageIndex]})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 text-center mb-8 px-4 relative flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center gap-2 mb-4 group">
          <motion.img
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            src={`${import.meta.env.BASE_URL}mano-logo.svg`}
            alt="Mano Consultants"
            className="h-14 md:h-16 w-auto drop-shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-transform duration-500 group-hover:scale-105"
          />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-2xl"
          >
            MANO
          </motion.span>
        </div>

        <h1 className="text-lg md:text-xl font-bold mb-3 text-gray-200 tracking-wide">
          Select Your Division
        </h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '50px' }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full mb-3"
        />
        <p className="text-gray-400 max-w-sm mx-auto text-xs md:text-sm font-light">
          Choose the specific vertical to explore our specialized services.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[75%] xl:max-w-[1500px] px-4 md:px-10 z-10 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="w-full relative group h-[380px] overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]"
        >
          <Link to="/pmc" className="block w-full h-full relative">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            </div>

            <div className="absolute bottom-3 left-3 right-3 p-5 h-[200px] flex flex-col justify-center rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg transition-all duration-500 group-hover:bg-white/15 group-hover:border-white/30">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg group-hover:bg-blue-500 transition-colors duration-300">
                  <Building className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2 leading-tight">MANO PMC</h2>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 opacity-90">
                    Project Management Consultants (PMC), Cost Consultancy, and comprehensive auditing services.
                  </p>
                  <div className="flex items-center text-white font-semibold group-hover:text-blue-200 transition-colors">
                    Explore Service <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="w-full relative group h-[380px] overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.3)]"
        >
          <Link to="/epc" className="block w-full h-full relative">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            </div>

            <div className="absolute bottom-3 left-3 right-3 p-5 h-[200px] flex flex-col justify-center rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg transition-all duration-500 group-hover:bg-white/15 group-hover:border-white/30">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center shrink-0 shadow-lg group-hover:bg-emerald-500 transition-colors duration-300">
                  <Hammer className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2 leading-tight">MANO EPC</h2>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 opacity-90">
                    Specialized Engineering, Procurement, and Construction (EPC) solutions.
                  </p>
                  <div className="flex items-center text-white font-semibold group-hover:text-emerald-200 transition-colors">
                    Explore Service <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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

export default GatewayTablet;
