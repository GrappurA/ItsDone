"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import React, { useEffect } from "react"

import ListElement from "./ReactComponents/ListElement"
import ListAddingForm from "./ReactComponents/ListAddingForm"
import CircularProgress from "./ReactComponents/CircularSize"
import LoginPage from "./ReactComponents/LoginPage"
import { createClient } from "@supabase/supabase-js"

import { nerkoOne } from './fonts/NerkoOne';

export default function HomePage() {
  const { data: session, status } = useSession()

  //{ name: "list1", itemsList: ["item2", "item2", "item32"], donePercentage: 100, done: false }
  const items = []
  const [userLists, setUserLists] = React.useState(items);
  const [isLoadingLists, setIsLoadingLists] = React.useState(true)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  /*
    useEffect(() => {
      async function fetchLists() {
        if (!session?.user?.id)
          return
  
        const { data, error } = await supabase
          .from("todo_lists")
          .select("*")
          .eq("owner_id", session.user.id)
          .order('created_at', { ascending: false });
  
        if (error)
          alert(error.message)
        else {
          setUserLists(data)
        }
        setIsLoadingLists(false)
      }
      fetchLists()
    }, [session])
  
  
    const itemsMap = userLists.map((item, itemIndex) => (
      <ListElement key={itemIndex} id={itemIndex} itemsList={item.itemsList} listName={item.name} donePercentage={item.donePercentage} done={item.done} />
    ))
  */

  //loading animation
  if (status == "loading") {
    return (
      <CircularProgress />
    )

  }

  if (session) {
    return (
      <div className={`bg-[#D0FFCE] p-1 ${nerkoOne.className} select-none`}>

        <ListAddingForm setLists={setUserLists} userLists={userLists} userId={session?.user.id} />

        <div id="CanvasForTasks" className="text-3xl border-black-200 rounded-xl border-4 w-[700px] mt-1 overflow-hidden">
          <p className="p-1 text-4xl bg-[#fffdce]">Your Lists</p>
          <hr className="w-[100%] " />

          <ul className='grid grid-cols-3 gap-1s justify-items-center'>
            {/*itemsMap*/}
          </ul>

        </div>
      </div>
    )
  }

  else {
    return (
      <LoginPage />
    )
  }

}