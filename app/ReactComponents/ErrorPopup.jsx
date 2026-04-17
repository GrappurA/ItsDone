import { useEffect } from "react";
import { nerkoOne } from '../fonts/NerkoOne'; // Adjust path if needed

export default function ErrorPopup({ message, onClose }) {
    // Auto-close the popup after 4 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 40000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!message) return null;

    return (
        <div className={`fixed bottom-10 right-5 z-50 animate-bounce ${nerkoOne.className}`}>
            <div className="relative flex items-center gap-4 bg-[#fffdce] border-4 border-black rounded-2xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">

                {/* Warning Icon */}
                <span className="text-4xl">⚠️</span>

                {/* Message */}
                <p className="text-[22px] pt-1 pr-6">{message}</p>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-xl bg-[#9D9695] text-white w-6 h-6 flex items-center justify-center rounded-full border-2 border-black hover:bg-gray-600 transition-colors active:translate-y-[2px]"
                >
                    &times;
                </button>
            </div>
        </div>
    );
}