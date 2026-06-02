'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PhotoAlbumProps {
  urls: string[];
}

export const PhotoAlbum: React.FC<PhotoAlbumProps> = ({ urls }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  if (!urls || urls.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-4 text-center mt-6">
      <h3 className="font-semibold text-textDark/80 text-sm tracking-wider uppercase">ألبوم الصور</h3>
      
      {/* Grid of photos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {urls.map((url, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveIdx(idx)}
            className="aspect-square relative rounded-xl overflow-hidden cursor-pointer border border-borderBlush/40 shadow-sm bg-white"
          >
            <img src={url} alt={`Album item ${idx}`} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <button
              type="button"
              onClick={() => setActiveIdx(null)}
              className="absolute top-4 md:top-6 right-4 md:right-6 text-white/80 hover:text-white p-3 md:p-2 rounded-full hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            {urls.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveIdx((prev) => (prev! === 0 ? urls.length - 1 : prev! - 1))}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 md:p-2 rounded-full hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIdx((prev) => (prev! === urls.length - 1 ? 0 : prev! + 1))}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 md:p-2 rounded-full hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
                </button>
              </>
            )}

            <motion.div
              key={activeIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl max-h-[80vh] relative rounded-xl overflow-hidden shadow-2xl"
            >
              <img src={urls[activeIdx]} alt="Album lightbox detail" className="object-contain max-w-full max-h-[80vh]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
