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
        <li className='m-2 rounded-2xl border-3'>
            <p className="text-center text-4xl">{props.listName}</p>

            <section className="flex items-stretch border-y-2 border-black w-[200px]">
                {/* Left Column: 100% */}
                <div className="flex items-center justify-center border-r-2 border-black px-2 py-1">
                    <p className="font-bold text-3xl leading-none m-0">{props.donePercentage}%</p>
                </div>
                {/* Right Column: Star */}
                <div className="flex flex-1 items-center justify-center py-1">
                    <Image src={props.done ? filledStar : unfilledStar} width={36} height={36} alt="unfilled star" loading="eager" />
                </div>
            </section>

            {/* items of the list */}
            <ul className="p-1">
                {itemsMap}
            </ul>
        </li>
    )
}