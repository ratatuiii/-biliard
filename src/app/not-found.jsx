'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Billiard, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6"
        >
            <h1 className="text-5xl font-extrabold mb-2">404 - Not Found</h1>
            <p className="text-lg text-gray-300 mb-6">
                Looks like the ball missed the pocket! This page doesn't exist.
            </p>
            <Link
                href="/"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-2xl transition-all"
            >
                <ArrowLeft size={18} />
                Return to Home
            </Link>
        </motion.div>
    );
}
