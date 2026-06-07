import { title } from "process";
import { createClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";

import createBrowserClient from "../../scripts/createBrowserClient"

export default function ListAddingForm(props) {

    const supabase = createBrowserClient()

    async function HandleClick(formData) {

        const todoListTitle = formData.get("todoList");
        props.setLists(prevLists => [{ title: todoListTitle, key: 1 }, ...prevLists])

        const { data, error } = await supabase
            .from("todo_lists")
            .insert({
                title: todoListTitle,
                owner_id: props.userId
            })
        if (error) {
            alert("error adding list: List has not been added " + error.message)
        }
    }

    return (
        <form action={HandleClick} className="text-2xl border-black-200 rounded-xl border-2 w-[700px] h-17 flex justify-items-center items-center overflow-hidden ">
            <input required placeholder="Add a todo list" type="text" name="todoList" id="todoInput" className="pl-1 h-full w-[85%] bg-white outline-none transition-all duration-300 focus:pl-3 placeholder:transition-opacity focus:placeholder:opacity-40" />
            <button type="submit" className="h-[100%]  w-[15%] bg-red-200 transition-all duration-200 hover:bg-red-300 hover:text-white active:scale-105"><strong>Add</strong></button>
        </form>
    )
}