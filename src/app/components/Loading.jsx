'use client';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
            <motion.div
                className="relative flex items-center justify-center w-24 h-24 rounded-full bg-green-500 shadow-2xl"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}
            >
                <span className="text-3xl font-bold">ELO</span>
            </motion.div>
            <motion.div
                className="mt-6 text-lg text-gray-300 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <Loader2 className="animate-spin" />
                Calculating ELO Rankings...
            </motion.div>
        </div>
    );
}
