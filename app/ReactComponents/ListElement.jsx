"use client"

import Image from "next/image"
import filledStar from "./src/filledStarIcon.png"

import unfilledStar from "./src/unfilledStarIcon.png"
import React from "react"
import { Handlee } from "next/font/google"

export default function ListElement(props) {

    const [isOpen, setIsOpen] = React.useState(false);
    const [isEditing, setisEditing] = React.useState(false);

    const itemsMap = props.itemsList.map((item, itemIndex) => {
        return <li key={itemIndex}>{item}</li>
    })

    return (
        <>

            <li onClick={() => setIsOpen(true)} className='m-2 rounded-2xl border-3 bg-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl cursor-pointer relative overflow-hidden group'>
                <div className="absolute top-0 -left-[100%] w-[60%] h-full bg-gradient-to-r from-transparent via-black/[0.06] to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-700 ease-in-out pointer-events-none z-10"></div>
                <p className="text-center text-4xl relative z-20 bg-[#cefffd]">{props.listName}</p>

                <section className="flex items-stretch border-y-2 border-black w-[200px]">
                    {/* Left Column: 100% */}
                    <div className="bg-[#C3EDAB] flex items-center justify-center border-r-2 border-black px-2 py-1">
                        <p className="font-bold text-3xl leading-none m-0">{props.donePercentage}%</p>
                    </div>
                    {/* Right Column: Star */}
                    <div className="bg-[#F2D7EE] w-full">

                        <div className="flex flex-1 items-center justify-center py-1 transition-transform duration-300 hover:rotate-70">
                            <Image src={props.done ? filledStar : unfilledStar} width={36} height={36} alt="unfilled star" loading="eager" />
                        </div>
                    </div>
                </section>

                {/* items of the list */}
                <ul className="p-1">
                    {itemsMap}
                </ul>
            </li>

            {isOpen &&

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                    onClick={() => setIsOpen(false)} // 2. Clicking this background layer closes the modal
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
                            <h2 className="text-5xl font-extrabold m-0 truncate pr-4">{props.listName}</h2>

                            <section className="flex items-stretch border-4 border-black rounded-xl overflow-hidden w-[240px] h-[60px] shrink-0 bg-white shadow-md">
                                <div className="bg-[#C3EDAB] flex items-center justify-center border-r-4 border-black px-4 w-1/2">
                                    <p className="font-bold text-4xl leading-none m-0">{props.donePercentage}%</p>
                                </div>
                                <div className="bg-[#F2D7EE] flex items-center justify-center w-1/2">
                                    <div className="transition-transform duration-300 hover:rotate-12 hover:scale-110">
                                        <Image src={props.done ? filledStar : unfilledStar} width={42} height={42} alt="star" loading="eager" />
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* BODY (Scrollable if list is too long) */}
                        <div className="flex-1 overflow-y-auto p-8 bg-white relative z-20">
                            <ul className="m-0 p-0">
                                {itemsMap}
                            </ul>
                        </div>

                        {/* FOOTER */}
                        <div className="p-6 border-t-4 border-black bg-gray-50 relative z-20 shrink-0">
                            <button className="w-full py-4 text-3xl font-bold border-4 border-black border-dashed rounded-2xl text-gray-400 hover:bg-[#cefffd] hover:text-black hover:border-solid hover:shadow-lg transition-all duration-300">
                                + Add New Task
                            </button>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}