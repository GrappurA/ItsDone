"use client"

import { div } from "motion/react-client"

interface TodoTask {
    id: number
    title: string
    status: boolean
    created_at: Date
}

interface TodoTasks {
    tasks: {
        data: TodoTasks[]
    }
}

export default function TasksTab({ tasks }: TodoTask) {
    const todoTasks = tasks.data.map((task, index) => <div key={task.id} className="flex items-center align-center gap-3 border-b-3 w-full hover:scale-105 duration-250 cursor-pointer hover:bg-green-200">
        <p> {index + 1})</p>
        <p className="text-4xl w-[25%]">{task.title}</p>
        <p className="w-[33%] text-3xl border-l-6 p-3"> {task.status ? "Done✅" : "Pending⏳"}</p>
        <p className="select-all border-l-6 p-3 ">{(task.created_at.split("T")[0])}</p>
    </div>);


    return (
        <div className="border-4 border-black rounded-2xl p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">

            {/* THE HEADER ROW: Using grid makes perfect columns */}
            <div className="grid grid-cols-12 gap-4 pb-4 border-b-4 border-black font-black text-2xl mb-4 text-gray-500">
                <div className="col-span-1">#</div>
                <div className="col-span-6">Task Name</div>
                <div className="col-span-3">Status</div>
                <div className="col-span-2">Date</div>
            </div>

            {/* THE DATA ROWS */}
            <div className="flex flex-col gap-2">
                {tasks.data.map((task, index) => (
                    <div
                        key={task.id}
                        // We use the exact same grid-cols-12 layout here so everything perfectly aligns with the header!
                        className="grid grid-cols-12 gap-4 items-center p-3 border-2 border-transparent hover:border-black rounded-xl hover:bg-[#D0FFCE] transition-all duration-200 cursor-pointer"
                    >
                        {/* Index */}
                        <p className="col-span-1 text-2xl font-bold text-gray-400">
                            {index + 1}
                        </p>

                        {/* Title (truncate prevents super long titles from breaking the row) */}
                        <p className="col-span-6 text-4xl font-bold truncate">
                            {task.title}
                        </p>

                        {/* Status */}
                        <p className={`col-span-3 text-3xl font-black ${task.status ? 'text-green-600' : 'text-gray-600'}`}>
                            {task.status ? "Done ✅" : "Pending ⏳"}
                        </p>

                        {/* Date */}
                        <p className="col-span-2 text-2xl font-mono text-gray-600 bg-gray-100 p-1 ml-[-12%] rounded-lg text-center w-fit">
                            {task.created_at.split("T")[0]}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    )

}