"use client"

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import UpdatingPopUp from "../ReactComponents/UpdatingPopUp"
import ListAddingForm from "../ReactComponents/ListAddingForm"
import { nerkoOne } from '../fonts/NerkoOne';
import ListElement from "../ReactComponents/ListElement"

export default function MainDashboard({ initialLists, session }) {

    const [lists, setLists] = useState(initialLists)
    const [isLoading, setIsLoading] = useState(false)
    const [isUpdatingData, setIsUpdatingData] = useState(false)

    const searchParams = useSearchParams()
    const listIdReference = searchParams.get('listId')
    const itemIdReference = searchParams.get('itemId')


    let itemsMap = [];

    if (lists) {
        itemsMap = lists.map((item) => (
            <ListElement
                setIsUpdatingData={setIsUpdatingData}
                autoOpen={item.id === listIdReference} autoOpenHighlight={itemIdReference}
                key={item.id} setLists={setLists}
                ownerId={item.owner_id} listId={item.id} userId={session?.user.id}
                title={item.title} donePercentage={item.done_percentage} isDone={item.is_done} todoItems={item.todo_tasks}
            />
        ))
    }

    return (
        // Changed to flex-col and items-center so the 700px container stays centered on desktop
        <div className={` h-full bg-[#D0FFCE] p-2 md:p-4 ${nerkoOne.className} select-none flex flex-col items-center`}>

            {isUpdatingData &&
                <UpdatingPopUp setIsUpdatingData={setIsUpdatingData} />
            }

            {/* Wrapped the form in the same max-width as the canvas so they align perfectly */}
            <div className="w-full max-w-[700px]">
                <ListAddingForm setIsUpdatingData={setIsUpdatingData} setLists={setLists} userLists={lists} userId={session?.user.id} session={session} />
            </div>

            {/* 🚨 THE WIDTH FIX: w-[700px] becomes w-full max-w-[700px] */}
            <div id="CanvasForTasks" className="text-3xl border-black rounded-xl border-4 w-full max-w-[700px] mt-4 overflow-hidden bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">

                <p className="p-3 text-4xl bg-[#fffdce] border-b-4 border-black">Your Lists</p>

                {/* 🚨 THE GRID FIX: 1 col on mobile, 2 on tablet, 3 on desktop. Added padding and gap-4. */}
                <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 justify-items-center'>
                    {itemsMap}
                </ul>

            </div>
        </div>
    )
}