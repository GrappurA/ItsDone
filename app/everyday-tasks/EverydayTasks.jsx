"use client"
import { div } from 'motion/react-client';
import { nerkoOne } from '../fonts/NerkoOne';
import UpdatingPopUp from '../ReactComponents/UpdatingPopUp'
import { useState } from "react";

export default function EverydayTasks() {
    //🎯
    const [isUpdatingData, setIsUpdatingData] = useState(false)
    const [everydayTasks, setEverydayTasks] = useState([])

    function HandleAddEverydayTask(formData) {
        const everydayTaskTitle = formData.get('everydayTask')
        setEverydayTasks(prev => [everydayTaskTitle, ...prev])
    }

    let itemsMap = []
    if (everydayTasks) {
        itemsMap = everydayTasks.map((task) => (
            <div key={task.id}>text</div>
        ))
    }



    return (
        /*<div className="mt-10 p-3 border-7 w-[50%] border-black rounded-2xl flex flex-col text-3xl items-center justify-center">
        
                        <form action={HandleAddEverydayTask} className="text-2xl border-black-200 rounded-xl border-2 w-full max-w-[700px] h-17 flex justify-items-center items-center overflow-hidden ">
                            <input required placeholder="Add an everyday task" type="text" name="everydayTask" id="todoInput" className="pl-1 h-full w-[85%] bg-white outline-none transition-all duration-300 focus:pl-3 placeholder:transition-opacity focus:placeholder:opacity-40" />
                            <button type="submit" className="h-[100%]  w-[15%] bg-red-200 transition-all duration-200 hover:bg-red-300 hover:text-white active:scale-105"><strong>Add</strong></button>
                        </form>
        
                        <div id="CanvasForTasks" className="text-3xl border-black rounded-xl border-4 w-full max-w-[700px] mt-4 overflow-hidden bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        
                            <p className="p-3 text-4xl bg-[#fffdce] border-b-4 border-black">Your Everydays🎯</p>
        
                            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 justify-items-center'>
                                {itemsMap}
                            </ul>
        
                        </div>
                    </div> */
        <div className={`${nerkoOne.className} bg-[#d0ffce] w-full h-full flex flex-col items-center justify-center p-4`}>

            {/* THE BADGE */}
            <div className="relative overflow-hidden w-full max-w-[400px] border-4 border-black rounded-2xl bg-[#fff770] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex items-center justify-center mt-10">

                {/* THE EMOJI BACKGROUND LAYER */}
                <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30 select-none">
                    {/* The Big Center Bullseye */}
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px]">🎯</span>

                    {/* The Small Scattered Bullseyes */}
                    <span className="absolute -top-4 -left-2 text-5xl">🎯</span>
                    <span className="absolute bottom-2 right-4 text-3xl">🎯</span>
                    <span className="absolute top-2 -right-4 text-6xl">🎯</span>
                    <span className="absolute -bottom-6 left-10 text-5xl">🎯</span>
                    <span className="absolute top-8 left-6 text-2xl">🎯</span>
                </div>

                {/* THE FOREGROUND TEXT */}
                <div className="relative z-10 bg-white px-6 py-3 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <h2 className="text-3xl md:text-4xl font-black text-black tracking-wide text-center uppercase m-0 leading-none">
                        Under<br />Construction
                    </h2>
                </div>

            </div>

        </div>
    )
}