"use client";

import { motion } from "framer-motion";

interface SuccessModalProps {
  isOpen: boolean;
}

export function SuccessModal({ isOpen }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="rounded-lg bg-white p-8 text-center shadow-xl"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <motion.h2
          className="mb-4 text-2xl font-bold text-blue-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Félicitations!
        </motion.h2>
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
        Maintenant, votre nom représente une personne qui se soucie de la santé des océans.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}