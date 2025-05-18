'use client';

import MainNavbar from "./components/MainNavbar";
import { useRouter } from 'next/navigation';
import { UserAuth } from "./contexts/AuthContext";
import { useEffect } from "react";
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const { user, googleSignIn, logOut } = UserAuth();

  const handleAuth = () => {
    try {
      googleSignIn();
      router.push('/home');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user, router]);

  return (
    <>
      <MainNavbar />
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-green-400">
              Welcome to Billiard Elo
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto mb-6">
              Track your matches. Challenge your friends. Climb the leaderboard with our dynamic Elo rating system.
            </p>
            <button
              onClick={handleAuth}
              className="mt-4 bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold py-3 px-6 rounded-xl shadow-lg"
            >
              Get Started
            </button>
          </motion.div>
        </main>

        {/* Features Section */}
        <section className="py-12 px-6 md:px-16 bg-black bg-opacity-30">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-green-400 mb-10"
          >
            Why Use Billiard Elo?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">Real Rankings</h3>
              <p className="text-gray-300">Every match impacts your Elo. Get fair rankings that evolve with your skill.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">Friendly Challenges</h3>
              <p className="text-gray-300">Play with friends, log outcomes, and boost your reputation in your circle.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">Stats & History</h3>
              <p className="text-gray-300">Access your performance graph, match history, and progress tracking.</p>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-8 text-center bg-gray-950">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-green-400 mb-6"
          >
            How It Works
          </motion.h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Sign in with Google. Create or join a match. Record scores. Your Elo adjusts based on win/loss probabilities. It's that easy.
          </p>
        </section>

        {/* CTA */}
        <section className="py-12 bg-black bg-opacity-40 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-green-300">Ready to begin your billiard legacy?</h2>
          <button
            onClick={handleAuth}
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl text-lg transition-all shadow-md"
          >
            Start Competing Now
          </button>
        </section>

      </div>
    </>
  );
}
