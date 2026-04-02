
export default function ListAddingForm() {

    function HandleClick(formData) {

        const todoTask = formData.get("todoTask");
        alert(todoTask)
    }

    return (
        <form action={HandleClick} className="text-2xl border-black-200 rounded-xl border-2 w-[700px] h-17 flex justify-items-center items-center overflow-hidden ">
            <input required placeholder="Add a todo list" type="text" name="todoTask" id="todoInput" className="pl-1 h-full w-[85%] bg-white outline-none transition-all duration-300 focus:pl-3 placeholder:transition-opacity focus:placeholder:opacity-40" />
            <button type="submit" className=" h-[100%]  w-[15%] bg-red-200 transition-all duration-200 hover:bg-red-300 hover:text-white active:scale-105"><strong>Add</strong></button>
        </form>
    )
}