'use client';

import Image from "next/image";
import MainNavbar from "../components/MainNavbar";
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <>
            <MainNavbar />
            <div className="flex min-h-screen bg-gradient-to-br from-black to-gray-900 text-white relative">

                {/* Background Image with Dark Overlay */}
                <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
                    <img
                        src="/billiard-table.jpg"
                        alt="Background"
                        className="w-full h-full object-cover blur-[10px]"
                    />
                    <div className="absolute inset-0 bg-black opacity-50" />
                </div>

                <main className="flex-1 flex flex-col justify-center items-center text-center p-8 z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-5xl font-bold text-green-400 mb-4"
                    >
                        About Billiard Elo
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="max-w-3xl text-lg text-gray-300 mb-6"
                    >
                        Billiard Elo is a platform designed to track and rank billiard players based on skill and match results using a dynamic Elo rating system.
                        Whether you're a casual player or a serious competitor, Billiard Elo brings structure to your games and helps you visualize your progress.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="max-w-3xl text-md text-gray-400 space-y-4"
                    >
                        <p>🎯 Compete in head-to-head matches and see your rating adjust in real time.</p>
                        <p>📊 View player stats, rankings, and match histories on your profile.</p>
                        <p>💬 Organize games, challenge friends, and climb the leaderboard.</p>
                        <p>🎱 Built by billiard lovers, for billiard lovers — with elegance and fairness in mind.</p>
                    </motion.div>
                </main>
            </div>
        </>
    );
}
