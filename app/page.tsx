"use client"
import Image from "next/image";

import ListElement from "./ReactComponents/ListElement"
import ListAddingForm from "./ReactComponents/ListAddingForm"

import { nerkoOne } from './fonts/NerkoOne';

export default function HomePage() {

  //fake items for testing
  const items = [["item1", "item2", "item3"], ["item1", "item22", "item3"], ["item112", "item2", "item3"]]
  //fix percentage and other stuff adding HERE
  const itemsMap = items.map((item, itemIndex) => (
    <ListElement key={itemIndex} itemsList={item} listName={"name"} />
  ))

  return (
    <div className={`bg-[#D0FFCE] p-1 ${nerkoOne.className} `}>

      <ListAddingForm />

      <div id="CanvasForTasks" className="text-3xl border-black-200 rounded-xl border-4 w-[700px] mt-1">
        <p className="p-1 text-4xl">Your Lists</p>
        <hr className="w-[100%] " />

        <ul className='grid grid-cols-3 gap-1s justify-items-center'>
          {itemsMap}
        </ul>

      </div>
    </div>
  )
}