"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import morePic from "../src/more.png";
import { signOut } from "next-auth/react";

export default function MoreMenu() {
    const [isOpen, setIsOpen] = useState(false);

    async function HandleSignOut() {
        localStorage.clear();
        signOut();
    }

    return (
        <div className="relative ml-auto">
            {/* The Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="border-solid border-4 p-1 rounded-3xl transition-all duration-300 hover:scale-110 hover:bg-white/10 active:scale-95 outline-none"
            >
                <Image src={morePic} width={50} height={50} alt="More" />
            </button>

            {/* The Animated Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 5, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-[#434343] border-2 border-white/20 rounded-2xl overflow-hidden shadow-2xl z-50"
                    >
                        <ul className="flex flex-col text-lg text-white">

                            <li className="hover:bg-white/10 p-3 cursor-pointer transition-colors border-b border-white/10">
                                👥 Friends
                            </li>
                            <li className="hover:bg-white/10 p-3 cursor-pointer transition-colors border-b border-white/10">
                                ⚙️ Settings
                            </li>
                            <li onClick={HandleSignOut} className="hover:bg-red-500/80 p-3 cursor-pointer transition-colors text-red-200">
                                🚪 Logout
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Invisible Overlay to close when clicking outside */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}