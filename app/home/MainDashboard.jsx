"use client"

import { useState } from "react";

import UpdatingPopUp from "../ReactComponents/UpdatingPopUp"
import ListAddingForm from "../ReactComponents/ListAddingForm"
import { nerkoOne } from '../fonts/NerkoOne';
import ListElement from "../ReactComponents/ListElement"

export default function MainDashboard({ initialLists, session }) {

    const [lists, setLists] = useState(initialLists)
    const [isLoading, setIsLoading] = useState(false)
    const [isUpdatingData, setIsUpdatingData] = useState(false)

    let itemsMap = [];

    function needsUpdate(cachedLists, dbLists) {
        const parsedCachedLists = JSON.parse(cachedLists)
        if (!parsedCachedLists)
            return true

        if (parsedCachedLists.length != dbLists.length)
            return true

        if (parsedCachedLists.length == 0 || dbLists.length == 0)
            return false

        const newestCacheTime = Math.max(...parsedCachedLists.map(listItem => new Date(listItem.updated_at).getTime()))
        const newestDbTime = Math.max(...dbLists.map(listItem => new Date(listItem.updated_at).getTime()))

        return newestDbTime > newestCacheTime;
    }

    if (lists) {
        itemsMap = lists.map((item) => (
            <ListElement setIsUpdatingData={setIsUpdatingData}
                key={item.id} setLists={setLists}
                ownerId={item.owner_id} listId={item.id} userId={session?.user.id}
                title={item.title} donePercentage={item.done_percentage} isDone={item.is_done} todoItems={item.todo_tasks}
            />
        ))
    }

    return (
        <div className={`bg-[#D0FFCE] p-1 ${nerkoOne.className} select-none h-[72.9vh]`}>
            {isUpdatingData &&
                <UpdatingPopUp setIsUpdatingData={setIsUpdatingData} />
            }
            <ListAddingForm setLists={setLists} userLists={lists} userId={session?.user.id} session={session} />

            <div id="CanvasForTasks" className="text-3xl border-black-200 rounded-xl border-4 w-[700px] mt-1 overflow-hidden">
                <p className="p-1 text-4xl bg-[#fffdce]">Your Lists</p>
                <hr className="w-[100%] " />

                <ul className='grid grid-cols-3 gap-1 justify-items-center'>
                    {itemsMap}
                </ul>

            </div>
        </div>
    )
}