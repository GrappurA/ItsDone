"use client"

import { useSession, signIn, signOut } from "next-auth/react"

import ListElement from "./ReactComponents/ListElement"
import ListAddingForm from "./ReactComponents/ListAddingForm"
import CircularProgress from "./ReactComponents/CircularSize"

import { nerkoOne } from './fonts/NerkoOne';


export default function HomePage() {

  //fake items for testing //maybe add later fetching here
  const items = [{ name: "list1", itemsList: ["item2", "item2", "item32"], donePercentage: 100, done: false }, { name: "list3", itemsList: ["item1", "item2", "item3"], donePercentage: 100, done: true }, { name: "list2", itemsList: ["item1", "item2", "item3"], donePercentage: 100, done: true }]

  //fix percentage and other stuff adding HERE
  const itemsMap = items.map((item, itemIndex) => (
    <ListElement key={itemIndex} id={itemIndex} itemsList={item.itemsList} listName={item.name} donePercentage={item.donePercentage} done={item.done} />
  ))

  //session loggedIn/loggedOut ?
  const { data: session, status } = useSession()

  if (status == "loading") {
    return (
      <CircularProgress />
    )

  }

  if (session) {
    return (
      <div className={`bg-[#D0FFCE] p-1 ${nerkoOne.className} select-none`}>

        <ListAddingForm />

        <div id="CanvasForTasks" className="text-3xl border-black-200 rounded-xl border-4 w-[700px] mt-1 overflow-hidden">
          <p className="p-1 text-4xl bg-[#fffdce]">Your Lists</p>
          <hr className="w-[100%] " />

          <ul className='grid grid-cols-3 gap-1s justify-items-center'>
            {itemsMap}
          </ul>

        </div>
      </div>
    )
  }

  else {
    return (
      <div className="flex flex-col items-center gap-4 mt-10">
        <form onSubmit={HandleLogin} className="flex flex-col">
          <p>You are not logged in.</p>
          <input type="text" name="username" id="" placeholder="username" required />
          <input type="password" name="password" id="" placeholder="password" required />
          <button type="submit">
            LogIn
          </button>
        </form>
      </div>
    )
  }
  async function HandleLogin(e) {
    e.preventDefault()

    const username = e.target.username.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false
    });

    if (result?.error)
      alert("Invalid username or password")

    window.location.reload();

  }
}