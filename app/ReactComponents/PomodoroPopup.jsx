"use client"
import useSupabaseBrowser from "../../scripts/createBrowserClient"
import { useState } from "react"
import UpdatingPopUp from "./UpdatingPopUp"

export default function PomodoroPopup({ setIsPomodoroOpen, userId }) {
    const supabase = useSupabaseBrowser()

    const [rounds, setRounds] = useState(1)
    const [sessionName, setSessionName] = useState(`Pomodoro Session ${new Date().toISOString().split('T')[0].replaceAll('-', '/')}`)
    const [isUpdatingData, setIsUpdatingData] = useState(false)

    const [tomatoes, setTomatoes] = useState([]);

    function handleAddRounds(e, amount) {
        setRounds(prev => prev + amount);

        // Make more sessions generate a much larger visual cascade
        // +1 button spawns 6 tomatoes, +2 spawns 12, +3 spawns 18
        const count = amount * 6;
        const newTomatoes = [];

        for (let i = 0; i < count; i++) {
            newTomatoes.push({
                id: Date.now() + Math.random() * (Math.random() * 10), // Guarantee unique React key
                // Start near the top, but scattered loosely around where you clicked or wide across the screen
                x: Math.random() * window.innerWidth, // Rain from anywhere horizontally
                // Give them slightly different starting heights so they fall in a wave
                delay: Math.random() * 0.4, // Stagger their start times
                speed: 1.5 + Math.random() * 2.5, // Randomized fall duration
                sway: -40 + Math.random() * 80, // Horizontal wind drift
                rotation: Math.random() * 360, // Random angles
                size: 25 + Math.random() * 10, // Randomized small sizes (14px - 24px)
            });
        }

        setTomatoes(prev => [...prev, ...newTomatoes]);

        // Cleanup after the maximum lifespan (2.5 seconds)
        setTimeout(() => {
            setTomatoes(prev => prev.filter(t => !newTomatoes.find(nt => nt.id === t.id)));
        }, 2500);
    }

    async function handleLogPomodoro(formData) {
        setIsUpdatingData(true)
        const sessionName = formData.get('sessionName')
        const sessionDate = formData.get('sessionDate')

        try {
            const { data, error } = await supabase
                .from('pomodoro_sessions')
                .insert({
                    user_id: userId,
                    session_name: sessionName,
                    created_at: sessionDate ? sessionDate : Date.now(),
                    session_rounds: rounds
                })

            if (error) throw new Error('error adding pomodoro session')

            setIsPomodoroOpen(false)
        } catch (error) {
            alert(error)
            console.log(error)
            setIsUpdatingData(false)
        }
        finally { setIsUpdatingData(false) }
    }

    return (
        // 1. THE BACKDROP: Fixed full-screen, centers content, handles outside clicks
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setIsPomodoroOpen(false)}
        >

            {isUpdatingData &&
                <UpdatingPopUp setIsUpdatingData={setIsUpdatingData} />
            }

            {/* 2. THE FORM: Stops the click from bubbling to the backdrop */}
            <form
                onClick={(e) => e.stopPropagation()}
                action={handleLogPomodoro}
                className="flex flex-col gap-6 p-4 md:p-3 bg-white border-4 border-black rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-[%] w-full max-w-[500px] relative z-20"
            >

                <div className="relative flex items-center justify-center pb-4 border-b-4 border-black mb-2">
                    <button
                        type="button"
                        onClick={() => setIsPomodoroOpen(false)}
                        className="absolute left-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#fffdce] border-4 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                    >
                        <span className="font-black text-xl md:text-2xl leading-none">{'<'}</span>
                    </button>

                    <h2 className="text-3xl md:text-4xl font-black text-center m-0 uppercase tracking-wide">
                        Log Session 🍅
                    </h2>
                </div>

                {/* 1. SESSION NAME */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="sessionName" className="text-2xl font-bold">Session Title</label>
                    <input
                        type="text"
                        id="sessionName"
                        name="sessionName"
                        value={sessionName}
                        onChange={(e) => setSessionName(e.target.value)}
                        placeholder="What did you work on?"
                        className="w-full border-4 border-black rounded-xl p-3 text-xl md:text-2xl outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all bg-[#cefffd] placeholder:text-black/40"
                        required
                    />
                    <p onClick={() => setSessionName('')} className="mb-[-2%] text-right text-lg text-gray-500 font-bold hover:text-black cursor-pointer underline decoration-2">Clean</p>
                </div>

                {/* 2. ROUNDS COUNTER & QUICK-ADD BUTTONS */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between border-4 border-black rounded-xl p-3 bg-[#F2D7EE] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-2xl font-bold m-0">Rounds Completed:</p>
                        <p className="text-4xl font-black m-0 px-4 py-1 bg-white border-4 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            {rounds}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={(e) => handleAddRounds(e, 1)}
                            className="flex-1 bg-[#C3EDAB] border-4 border-black rounded-xl py-2 text-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                        >
                            +1
                        </button>
                        <button
                            type="button"
                            onClick={(e) => handleAddRounds(e, 2)}
                            className="flex-1 bg-[#C3EDAB] border-4 border-black rounded-xl py-2 text-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                        >
                            +2
                        </button>
                        <button
                            type="button"
                            onClick={(e) => handleAddRounds(e, 3)}
                            className="flex-1 bg-[#C3EDAB] border-4 border-black rounded-xl py-2 text-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                        >
                            +3
                        </button>
                    </div>
                    <p onClick={() => setRounds(0)} className="mb-[-5%] text-right text-lg text-gray-500 font-bold hover:text-black cursor-pointer underline decoration-2">
                        Reset counter
                    </p>
                </div>

                {/* 3. DATE PICKER */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="sessionDate" className="text-2xl font-bold">Date</label>
                    <input
                        type="date"
                        id="sessionDate"
                        name="sessionDate"
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className="w-full border-4 border-black rounded-xl p-3 text-xl md:text-2xl outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all bg-white"
                        required
                    />
                </div>

                {/* 4. SUBMIT BUTTON */}
                <button
                    type="submit"
                    className="mt-2 w-full bg-[#fffdce] border-4 border-black rounded-xl py-4 text-3xl font-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-2 active:shadow-none transition-all"
                >
                    Log Session ✔️
                </button>
            </form>

            {/* THE VFX TOMATO RAIN RENDERER */}
            {tomatoes.map(t => (
                <div
                    key={t.id}
                    className="fixed pointer-events-none z-[100] select-none animate-tomato-rain"
                    style={{
                        left: `${t.x}px`,
                        top: '-40px', // Start off-screen at the top to simulate falling rain
                        fontSize: `${t.size}px`,
                        animationDelay: `${t.delay}s`,
                        animationDuration: `${t.speed}s`,
                        transform: `rotate(${t.rotation}deg)`,
                        '--drift': `${t.sway}px` // Pass random sway behavior to CSS
                    }}
                >
                    🍅
                </div>
            ))}

            <style>{`
            @keyframes tomato-rain {
                0% { 
                    opacity: 0;
                    transform: translateY(0) rotate(0deg); 
                }
                10% {
                    opacity: 0.9;
                }
                100% { 
                    opacity: 0; 
                    /* Drifts horizontally based on our random '--drift' variable while falling completely off the screen */
                    transform: translateY(110vh) translateX(var(--drift)) rotate(360deg); 
                }
            }
            .animate-tomato-rain {
                animation-name: tomato-rain;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
            }
        `}</style>

        </div >)
}
