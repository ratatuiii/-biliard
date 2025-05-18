'use client';
import { motion } from 'framer-motion';
import { UserX } from 'lucide-react';
import Link from 'next/link';

export default function UserNotFound({ name }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white text-center p-6"
        >
            <UserX size={64} className="text-red-500 mb-4" />
            <h1 className="text-4xl font-bold mb-2">User "{name}" Not Found</h1>
            <p className="text-lg text-gray-400 mb-6">
                We couldn't find a player with that name in the rankings.
            </p>
            <Link
                href="/"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-2xl transition-all"
            >
                Return Home
            </Link>
        </motion.div>
    );
}
