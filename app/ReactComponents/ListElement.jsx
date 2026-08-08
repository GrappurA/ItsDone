"use client"

import Image from "next/image"
import filledStar from "./src/filledStarIcon.png"
import unfilledStar from "./src/unfilledStarIcon.png"

import { use, useEffect, useState } from "react"
import createBrowserClient from "../../scripts/createBrowserClient"
import UseAnimations from "react-useanimations"
import trash from 'react-useanimations/lib/trash'
import { useRouter } from "next/navigation"

export default function ListElement(props) {

    //variables
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()

    //every list has its own itemsList(list of todo items)
    const [itemsList, setItemsList] = useState(props.todoItems || [])
    useEffect(() => {
        setItemsList(props.todoItems || [])
    }, [props.todoItems])

    useEffect(() => {
        if (props.autoOpen && props.autoOpenHighlight) {
            setIsOpen(true)

        }

    }, [props.autoOpen])

    let listItemsMap;

    const supabase = createBrowserClient();

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

        const isDone = todoItemStatus == null ? false : true
        const fakeItemId = Date.now()
        const optimisticItem = {
            list_id: props.listId,
            title: todoItemTitle,
            status: isDone,
            owner_id: props.ownerId,
            id: fakeItemId
        }
        setItemsList(prevItems => [optimisticItem, ...prevItems])

        try {
            props.setIsUpdatingData(true)

            const { data: realTask, error } = await supabase
                .from("todo_tasks")
                .insert({
                    list_id: props.listId,
                    title: todoItemTitle,
                    status: todoItemStatus == null ? false : true,
                    owner_id: props.ownerId
                })
                .select()
                .single()

            if (error) {
                props.setIsUpdatingData(false)
                throw error
            }
            setItemsList(prevList =>
                prevList.map(item =>
                    item.id === fakeItemId ? { ...item, id: realTask.id } : item)
            )

        } catch (err) {
            alert("failed to save task" + err.message)
            props.setIsUpdatingData(false)
            setItemsList(prevList => prevList.filter(item => item.id != fakeItemId))
        }
        finally {
            props.setIsUpdatingData(false)
        }
    }

    //toggle 'done' status
    async function handleToggleTask(itemId) {
        const itemToToggle = itemsList.find(item => item.id === itemId)
        if (!itemToToggle)
            return

        //updating status of a todo_task
        const newStatus = itemToToggle.status == true ? false : true
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
            alert("failed to update your data" + err.message)
            props.setIsUpdatingData(false)
        }
        finally {
            props.setIsUpdatingData(false)
        }
    }

    //delete list
    async function handleDeleteList(listId) {
        if (!listId) return
        props.setIsUpdatingData(true)

        //optimistic ui update
        props.setLists(prev => prev.filter(l => l.id !== listId))

        try {
            const { error } = await supabase
                .from('todo_lists')
                .delete()
                .eq('id', listId)
            if (error)
                throw new Error('Error deleting list')
        } catch (err) {
            alert(err)
        }
        finally {
            props.setIsUpdatingData(false)
        }

    }

    //delete task
    async function handleDeleteTask(itemId) {
        if (!itemId)
            return undefined
        setItemsList(prevItemList => prevItemList.filter(item => item.id != itemId))

        try {
            props.setIsUpdatingData(true)
            const { error } = await supabase.
                from("todo_tasks").
                delete().
                eq("id", itemId)

            if (error)
                throw error
        } catch (err) {
            alert("failed to delete task")
            console.log(err.message)
        }
        finally {
            props.setIsUpdatingData(false)
        }
    }

    if (itemsList) {
        listItemsMap = itemsList.map((item, index) => {
            const isDone = item.status === true || item.status === "completed" || item.status === "on";
            return (
                <div key={index} className="">
                    {item.id === props.autoOpenHighlight ? <p className="text-5xl text-red-400 animate-bounce">! Attention </p> : ""}
                    <div
                        // 🚨 RESPONSIVE FIX: gap-2 on mobile, smaller padding, adjusted text sizes
                        className={`w-full flex justify-between items-center gap-2 md:gap-4 p-3 md:p-5 mb-4 border-4 border-black rounded-2xl transition-all duration-300 
                        shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                          ${isDone ? "bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-[2px]"
                                : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
                            }`}>

                        <button
                            onClick={() => handleDeleteTask(item.id)}
                            title="Delete Task"
                            // Shrinking button for mobile
                            className="
        flex items-center justify-center w-10 h-10 md:w-12 md:h-12 shrink-0
        bg-[#ff4a4a] text-black text-xl md:text-2xl font-black leading-none
        border-4 border-black rounded-xl 
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
        transition-all cursor-pointer
        hover:bg-[#ff2b2b] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1
        active:translate-y-[4px] active:translate-x-[4px] active:shadow-none
    "
                        >
                            X
                        </button>

                        {/* 🚨 RESPONSIVE FIX: flex-1 takes up remaining space instead of hard max-width */}
                        <p className={`text-xl md:text-3xl font-bold truncate pr-2 flex-1 transition-all duration-300 ${isDone ? "line-through text-gray-400 decoration-4 decoration-black" : "text-black"
                            }`}>
                            {item.title}
                        </p>

                        <button
                            onClick={() => handleToggleTask(item.id)}
                            // Shrinking button and text for mobile
                            className={`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0
                            px-2 py-2 md:px-4 md:py-2 border-4 border-black rounded-xl font-black text-sm md:text-xl cursor-pointer transition-all active:translate-y-[4px] active:translate-x-[4px] active:shadow-none ${isDone
                                    ? "bg-[#D0FFCE] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    : "bg-[#fffdce] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#fff770] "
                                }`}>
                            {isDone ? "Done ✔" : "Pending"}
                        </button>
                    </div>

                </div>
            )

        }
        )
    }

    return (
        <>
            {/* CLOSED CARD STATE */}
            <li onClick={() => setIsOpen(true)} className='m-2 w-full max-w-[300px] rounded-2xl border-3 bg-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl cursor-pointer relative overflow-hidden group'>
                <div className="absolute top-0 -left-[100%] w-[60%] h-full bg-gradient-to-r from-transparent via-black/[0.06] to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-700 ease-in-out pointer-events-none z-10"></div>

                <p className="text-center text-3xl md:text-4xl relative z-20 bg-[#cefffd] truncate px-2">{props.title}</p>

                <section className="flex items-stretch border-y-2 border-black w-full">
                    <div className="bg-[#C3EDAB] flex items-center justify-center border-r-2 border-black px-4 py-1 w-1/3">
                        <p className="font-bold text-3xl leading-none m-0">{donePercentage}%</p>
                    </div>
                    <div className="bg-[#F2D7EE] w-2/3">

                        <div className="w-full flex items-center justify-center py-2 transition-transform duration-300 hover:rotate-12">
                            <Image src={donePercentage > donePercentageThreshhold ? filledStar : unfilledStar} width={36} height={36} alt="star" loading="eager" />
                        </div>
                    </div>
                </section>

                <ul className="p-1">
                    <p className="text-[20px] md:text-[24px] text-center">contains: <u>{itemsList.length}</u> items</p>
                </ul>
            </li>

            {/* OPEN MODAL STATE */}
            {isOpen &&
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 md:p-4"
                    onClick={() => {
                        setIsOpen(false)
                        router.push('/home')
                    }}>

                    {/* 🚨 RESPONSIVE FIX: max-w-[800px] and max-h-[95vh] prevents overflow on phones */}
                    <div
                        className='w-full max-w-[800px] max-h-[95dvh] flex flex-col rounded-3xl border-4 border-black bg-white shadow-2xl relative overflow-hidden group'
                        onClick={(e) => e.stopPropagation()}>

                        <div className="absolute top-0 -left-[100%] w-[60%] h-full bg-gradient-to-r from-transparent via-black/[0.06] to-transparent skew-x-[-25deg] hover:left-[200%] transition-all duration-700 ease-in-out pointer-events-none z-10"></div>

                        {/* MODAL HEADER */}
                        {/* 🚨 RESPONSIVE FIX: flex-col on mobile, flex-row on desktop */}
                        <div className="bg-[#cefffd] border-b-4 border-black p-4 md:p-6 relative z-20 flex flex-col md:flex-row gap-4 justify-between items-center shrink-0">

                            <section className="flex items-center justify-between w-full md:w-auto">
                                <section onClick={() => { setIsOpen(false) }}
                                    className="flex items-center justify-center border-4 rounded-3xl mr-3 hover:scale-110 transition-all active:scale-150 active:bg-red-400">
                                    <p className="h-[40%] pr-1 pl-1">{'<'}</p>
                                </section>
                                <h2 className="text-3xl md:text-5xl font-extrabold m-0 truncate pr-4 flex-1">{props.title}</h2>
                                <button
                                    onClick={() => { handleDeleteList(props.listId) }}
                                    className="flex items-center justify-center shrink-0 w-12 h-12 md:w-14 md:h-14 bg-[#ff4a4a] border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                                >
                                    <UseAnimations
                                        animation={trash}
                                        size={28}
                                        strokeColor="black"
                                        wrapperStyle={{ padding: 0 }}
                                    />
                                </button>
                            </section>

                            {/* 🚨 RESPONSIVE FIX: w-full on mobile, w-[240px] on desktop */}
                            <section className="flex items-stretch border-4 border-black rounded-xl overflow-hidden w-full md:w-[240px] h-14 md:h-[60px] shrink-0 bg-white shadow-md">
                                <div className="bg-[#C3EDAB] flex items-center justify-center border-r-4 border-black px-4 w-1/2">
                                    <p className="font-bold text-3xl md:text-4xl leading-none m-0">{donePercentage}%</p>
                                </div>
                                <div className="bg-[#F2D7EE] flex items-center justify-center w-1/2">
                                    <div className="transition-transform duration-300 hover:rotate-12 hover:scale-110">
                                        <Image src={donePercentage > donePercentageThreshhold ? filledStar : unfilledStar} width={36} height={36} alt="star" loading="eager" />
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* MODAL BODY (Add Task Form) */}
                        <div className="shrink-0 p-4 md:p-8 bg-white relative z-20">
                            <form action={handleAddNewTaskClick}>
                                <div className="flex gap-2">

                                    <input
                                        type="text"
                                        name="todoTaskTitle"
                                        placeholder="What needs to be done?"
                                        className="w-full border-4 border-black rounded-xl p-2 md:p-3 text-lg md:text-2xl outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all bg-white placeholder:text-gray-400"
                                        required
                                    />

                                    {/* 🚨 RESPONSIVE FIX: fixed standard tailwind sizing w-12/w-16 */}
                                    <input
                                        type="checkbox"
                                        name="todoTaskStatus"
                                        className="
                                    shrink-0 appearance-none w-12 h-12 md:w-16 md:h-16 
                                    border-4 border-black rounded-xl bg-white 
                                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                                    hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]
                                    cursor-pointer relative transition-all
                                    active:translate-y-[4px] active:translate-x-[4px] active:shadow-none
                                    checked:bg-[#D0FFCE] 
                                    after:content-[''] checked:after:content-['✔'] 
                                    after:absolute after:left-1/2 after:top-1/2 
                                    after:-translate-x-1/2 after:-translate-y-1/2 
                                    after:text-2xl md:text-3xl after:text-black after:font-black"
                                    />
                                </div>

                                <button type="submit" className="mt-4 w-full py-2 md:py-4 text-xl md:text-3xl font-bold border-4 border-black border-dashed rounded-2xl text-gray-400 hover:bg-[#cefffd] hover:text-black hover:border-solid hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                                    + Add New Task
                                </button>
                            </form>
                        </div>

                        {/* MODAL FOOTER (List Items) */}
                        <div className="p-2 md:p-6 border-t-4 border-black bg-gray-50 relative z-20 flex-1 overflow-y-auto">
                            {listItemsMap}
                        </div>

                    </div>
                </div >
            }
        </>
    )
}