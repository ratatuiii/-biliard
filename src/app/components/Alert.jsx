'use client';

import { motion, AnimatePresence } from "framer-motion";

export default function Alert({ type = "success", message, show, onClose }) {
    const bgColor = {
        success: "bg-green-600",
        error: "bg-red-600",
        warning: "bg-yellow-500",
        info: "bg-blue-600"
    }[type];

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl text-white shadow-lg ${bgColor}`}
                >
                    <div className="flex items-center justify-between gap-4">
                        <span>{message}</span>
                        <button onClick={onClose} className="ml-4 font-bold">×</button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
