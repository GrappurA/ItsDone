"use client"

import Image from "next/image"
import filledStar from "./src/filledStarIcon.png"
import unfilledStar from "./src/unfilledStarIcon.png"

import React from "react"
import useSupabase from "../../scripts/createClient"

export default function ListElement(props) {

    //variables
    const [isOpen, setIsOpen] = React.useState(false);

    //every list has its own itemsList(list of todo items)
    const [itemsList, setItemsList] = React.useState(props.todoItems || [])
    React.useEffect(() => {
        setItemsList(props.todoItems || [])
    }, [props.todoItems])

    let listItemsMap;

    const supabase = useSupabase();

    //donePercentage calculation
    const donePercentageThreshhold = 60
    let donePercentage;
    if (itemsList.length > 0) {
        donePercentage = Math.round(itemsList.filter(item => item.status == true || item.status == "completed" || item.status == "on").length / itemsList.length * 100);
    }
    else {
        donePercentage = 0;
    }

    //add new todo item
    async function handleAddNewTaskClick(formData) {
        const todoItemTitle = formData.get("todoTaskTitle")
        const todoItemStatus = formData.get("todoTaskStatus")
        try {
            props.setIsUpdatingData(true)
            const { data, error } = await supabase
                .from("todo_tasks")
                .insert({
                    list_id: props.listId,
                    title: todoItemTitle,
                    status: todoItemStatus == null ? false : true,
                    owner_id: props.ownerId
                })
            if (error)
                props.setIsUpdatingData(false)
        } catch (err) {
            alert(err.message)
            props.setIsUpdatingData(false)
        }
        finally {
            props.setIsUpdatingData(false)
        }

        setItemsList(prevItems => [{ title: todoItemTitle, status: todoItemStatus, id: itemsList.length == 0 ? 0 : itemsList.length, listId: props.listId }, ...prevItems])
    }

    //toggle 'done' status
    async function handleToggleTask(itemId) {
        const itemToToggle = itemsList.find(item => item.id === itemId)
        if (!itemToToggle)
            return

        //updating status of a todo_task
        const newStatus = itemToToggle.status == "on" ? null : "on";
        setItemsList(prevItems =>
            prevItems.map(item =>
                item.id == itemId ? { ...item, status: newStatus } : { ...item },
            )
        )

        try {
            props.setIsUpdatingData(true)
            const { error } = await supabase.
                from("todo_tasks")
                .update({ "status": newStatus })
                .eq("id", itemId)
        } catch (err) {
            alert(error.message)
            props.setIsUpdatingData(false)
        }
        finally {
            props.setIsUpdatingData(false)
        }
    }

    if (itemsList) {
        listItemsMap = itemsList.map((item, index) => {
            const isDone = item.status === true || item.status === "completed" || item.status === "on";
            return (
                <div
                    key={index}
                    className={`flex justify-between items-center p-5 mb-4 border-4 border-black rounded-2xl transition-all duration-300 
                        shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                          ${isDone ? "bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-[2px]" // Pushed-down, "completed" look
                            : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1" // Active, popping look
                        }`}>

                    <p className={`text-3xl font-bold truncate pr-4 max-w-[70%] transition-all duration-300 ${isDone ? "line-through text-gray-400 decoration-4 decoration-black" : "text-black"
                        }`}>
                        {item.title}
                    </p>

                    {/* Status Badge (Now a clickable button!) */}
                    <button
                        onClick={() => handleToggleTask(item.id)}
                        className={`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                            px-4 py-2 border-4 border-black rounded-xl font-black text-xl cursor-pointer transition-all active:translate-y-[4px] active:translate-x-[4px]  active:shadow-none ${isDone
                                ? "bg-[#D0FFCE] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" // Green for done
                                : "bg-[#fffdce] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#fff770] " // Yellow for pending
                            }`}>
                        {isDone ? "Done ✔" : "Pending"}
                    </button>
                </div>
            )
        }
        )
    }

    // closed item
    return (
        <>
            <li onClick={() => setIsOpen(true)} className='m-2 rounded-2xl border-3 bg-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl cursor-pointer relative overflow-hidden group'>
                <div className="absolute top-0 -left-[100%] w-[60%] h-full bg-gradient-to-r from-transparent via-black/[0.06] to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-700 ease-in-out pointer-events-none z-10"></div>
                <p className="text-center text-4xl relative z-20 bg-[#cefffd]">{props.title}</p>

                <section className="flex items-stretch border-y-2 border-black w-[200px]">
                    <div className="bg-[#C3EDAB] flex items-center justify-center border-r-2 border-black px-2 py-1">
                        <p className="font-bold text-3xl leading-none m-0">{donePercentage}%</p>
                    </div>

                    <div className="bg-[#F2D7EE] w-full">
                        <div className="flex flex-1 items-center justify-center py-1 transition-transform duration-300 hover:rotate-70">
                            <Image src={donePercentage > donePercentageThreshhold ? filledStar : unfilledStar} width={36} height={36} alt="unfilled star" loading="eager" />
                        </div>
                    </div>
                </section>

                {/* items of the list */}
                <ul className="p-1">
                    <p className="text-[24px] text-center">contains: <u>{listItemsMap.length}</u> items</p>
                </ul>
            </li>

            {/*opened item*/}
            {isOpen &&

                <div
                    className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                    onClick={() => setIsOpen(false)}
                >
                    {/* 3. THE MODAL CONTENT: Stop click events from bubbling up to the overlay */}
                    <div
                        className='w-[800px] max-h-[90vh] flex flex-col rounded-3xl border-4 border-black bg-white shadow-2xl relative overflow-hidden group'
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Shading Animation */}
                        <div className="absolute top-0 -left-[100%] w-[60%] h-full bg-gradient-to-r from-transparent via-black/[0.06] to-transparent skew-x-[-25deg] hover:left-[200%] transition-all duration-700 ease-in-out pointer-events-none z-10"></div>

                        {/* HEADER */}
                        <div className="bg-[#cefffd] border-b-4 border-black p-6 relative z-20 flex justify-between items-center shrink-0">
                            <h2 className="text-5xl font-extrabold m-0 truncate pr-4">{props.title}</h2>

                            <section className="flex items-stretch border-4 border-black rounded-xl overflow-hidden w-[240px] h-[60px] shrink-0 bg-white shadow-md">
                                <div className="bg-[#C3EDAB] flex items-center justify-center border-r-4 border-black px-4 w-1/2">
                                    <p className="font-bold text-4xl leading-none m-0">{donePercentage}%</p>
                                </div>
                                <div className="bg-[#F2D7EE] flex items-center justify-center w-1/2">
                                    <div className="transition-transform duration-300 hover:rotate-12 hover:scale-110">
                                        <Image src={donePercentage > donePercentageThreshhold ? filledStar : unfilledStar} width={42} height={42} alt="star" loading="eager" />
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* BODY (Scrollable if list is too long) */}
                        <div className="flex-1 p-8 bg-white relative z-20">
                            <form action={handleAddNewTaskClick}>
                                <div className="flex gap-1">

                                    <input
                                        type="text"
                                        name="todoTaskTitle"
                                        placeholder="What needs to be done?"
                                        className="w-full border-4 border-black rounded-xl p-3 mr-4 text-2xl outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all bg-white placeholder:text-gray-400"
                                        required
                                    />

                                    <input
                                        type="checkbox"
                                        name="todoTaskStatus"
                                        className="
                                    appearance-none w-17 h-17 min-w-[2.5rem] 
                                    border-4 border-black rounded-xl bg-white 
                                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                                    hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]
                                    cursor-pointer relative transition-all
                                    active:translate-y-[4px] active:translate-x-[4px] active:shadow-none
                                    checked:bg-[#D0FFCE] 
                                    after:content-[''] checked:after:content-['✔'] 
                                    after:absolute after:left-1/2 after:top-1/2 
                                    after:-translate-x-1/2 after:-translate-y-1/2 
                                    after:text-3xl after:text-black after:font-black"
                                    />
                                </div>

                                <button type="submit" className="mt-2 w-full py-4 text-3xl font-bold border-4 border-black border-dashed rounded-2xl text-gray-400 hover:bg-[#cefffd] hover:text-black hover:border-solid hover:shadow-lg transition-all duration-300">
                                    + Add New Task
                                </button>
                            </form>
                        </div>

                        {/* FOOTER */}
                        <div className="p-6 border-t-4 border-black bg-gray-50 relative z-20 shrink-0 overflow-auto scroll-auto">
                            {listItemsMap}
                        </div>

                    </div>
                </div>
            }
        </>
    )
}