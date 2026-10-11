"use client"
import useSupabaseBrowser from "../../scripts/createBrowserClient"
import { useState } from "react"

export default function PomodoroPopup({ setIsPomodoroOpen, userId }) {
    const supabase = useSupabaseBrowser()

    const [rounds, setRounds] = useState(1)

    async function handleLogPomodoro(formData) {
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

        } catch (error) {
            alert(error)
            console.log(error)
        }
    }

    return (
        // 1. THE BACKDROP: Fixed full-screen, centers content, handles outside clicks
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setIsPomodoroOpen(false)}
        >
            {/* 2. THE FORM: Stops the click from bubbling to the backdrop */}
            <form
                onClick={(e) => e.stopPropagation()}
                action={handleLogPomodoro}
                className="flex flex-col gap-6 p-4 md:p-3 bg-white border-4 border-black rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-[%] w-full max-w-[500px] relative z-20"
            >
                <h2 className="text-4xl font-black text-center m-0 pb-4 border-b-4 border-black uppercase tracking-wide">
                    Log Session 🍅
                </h2>

                {/* 1. SESSION NAME */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="sessionName" className="text-2xl font-bold">Focus Target</label>
                    <input
                        type="text"
                        id="sessionName"
                        name="sessionName"
                        placeholder="What did you work on?"
                        defaultValue={`Pomodoro Session ${new Date().toISOString().split('T')[0].replaceAll('-', '/')}`}
                        className="w-full border-4 border-black rounded-xl p-3 text-xl md:text-2xl outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all bg-[#cefffd] placeholder:text-black/40"
                        required
                    />
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
                            onClick={() => setRounds(prev => prev + 1)}
                            className="flex-1 bg-[#C3EDAB] border-4 border-black rounded-xl py-2 text-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                        >
                            +1
                        </button>
                        <button
                            type="button"
                            onClick={() => setRounds(prev => prev + 2)}
                            className="flex-1 bg-[#C3EDAB] border-4 border-black rounded-xl py-2 text-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                        >
                            +2
                        </button>
                        <button
                            type="button"
                            onClick={() => setRounds(prev => prev + 3)}
                            className="flex-1 bg-[#C3EDAB] border-4 border-black rounded-xl py-2 text-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                        >
                            +3
                        </button>
                    </div>
                    <p onClick={() => setRounds(0)} className="text-right text-lg text-gray-500 font-bold hover:text-black cursor-pointer underline decoration-2">
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
        </div>
    )
}