"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import React, { useEffect } from "react"

import ListElement from "./ReactComponents/ListElement"
import ListAddingForm from "./ReactComponents/ListAddingForm"
import CircularProgress from "./ReactComponents/CircularSize"
import LoginPage from "./ReactComponents/LoginPage"
import UpdatingPopUp from "./ReactComponents/UpdatingPopUp"

import useSupabase from "../scripts/createClient"

import { nerkoOne } from './fonts/NerkoOne';

export default function HomePage() {
  const { data: session, status } = useSession()
  const supabase = useSupabase();

  const [userLists, setUserLists] = React.useState();
  const [isLoadingLists, setIsLoadingLists] = React.useState(true)
  const [isUpdatingData, setIsUpdatingData] = React.useState(false);

  let itemsMap;

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

  useEffect(() => {
    async function fetchMyLists() {
      //checking user
      if (!session?.user?.id || !session?.supabaseAccessToken) {
        setIsLoadingLists(false)
        return
      }

      //list caching
      const cachedLists = localStorage.getItem("my_cached_lists")
      if (cachedLists) {
        setUserLists(JSON.parse(cachedLists))
        setIsLoadingLists(false)
      }

      //fetching lists
      try {
        const { data, error } = await supabase
          .from("todo_lists")
          .select(`
            *,
            todo_tasks (id, list_id, owner_id, title, status)
            `)
          .eq("owner_id", session.user.id)
          .order("created_at", { ascending: false })

        if (error?.message.includes("JWT expired") || error?.code == "PGRST301") {
          signOut({ callbackUrl: "/" })
          return
        }
        else if (error) {
          console.error(error)
          return
        }

        //check browsers cache vs fetched lists and invoke 'updating data' popup
        if (data && needsUpdate(cachedLists, data)) {

          setIsUpdatingData(true)
          setTimeout(() => {
            setIsUpdatingData(false)
          }, 1500)

          setUserLists(data)
          localStorage.setItem("my_cached_lists", JSON.stringify(data))

        }

      } catch (err) {
        console.warn("Ignored browser execution error:", err)
      }
      finally {
        setIsLoadingLists(false)
      }
    }

    fetchMyLists()
  }, [session])

  if (userLists) {
    itemsMap = userLists.map((item, itemIndex) => (
      <ListElement setIsUpdatingData={setIsUpdatingData}
        key={item.id} ownerId={item.owner_id} listId={item.id} userId={session?.user.id}
        title={item.title} donePercentage={item.done_percentage} isDone={item.isDone} todoItems={item.todo_tasks}
      />
    ))
  }

  //loading animation
  if (status == "loading") {
    return (
      <CircularProgress />
    )
  }

  if (session) {
    return (
      <div className={`bg-[#D0FFCE] p-1 ${nerkoOne.className} select-none h-[72.9vh]`}>
        {isUpdatingData &&
          <UpdatingPopUp setIsUpdatingData={setIsUpdatingData} />
        }
        <ListAddingForm setLists={setUserLists} userLists={userLists} userId={session?.user.id} session={session} />

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

  else {
    return (
      <LoginPage />
    )
  }
}