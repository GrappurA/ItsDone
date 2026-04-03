"use client"

import Image from "next/image"

import unfilledStar from "./src/unfilledStarIcon.png"
import filledStar from "./src/filledStarIcon.png"
import { li } from "motion/react-client"

export default function ListElement(props) {

    const itemsMap = props.itemsList.map((item, itemIndex) => {
        return <li key={itemIndex}>{item}</li>
    })

    return (
        <li className='m-2 rounded-2xl border-3 bg-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl cursor-pointer relative overflow-hidden group'>
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
    )
}