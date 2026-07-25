"use client"

import { div } from "motion/react-client"

// 1. Fixed: created_at is now a string!
interface TodoTask {
    id: number
    title: string
    status: boolean
    created_at: string
}

// 2. Fixed: data is an array of the singular TodoTask
interface TasksTabProps {
    tasks: {
        data: TodoTask[]
    }
}

// 3. Updated the prop type name
export default function TasksTab({ tasks }: TasksTabProps) {

    // (Removed the unused todoTasks map variable that was sitting here)

    return (
        <div className="border-4 border-black rounded-2xl p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">

            {/* THE HEADER ROW */}
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
                        className="grid grid-cols-12 gap-4 items-center p-3 border-2 border-transparent hover:border-black rounded-xl hover:bg-[#D0FFCE] transition-all duration-200 cursor-pointer"
                    >
                        {/* Index */}
                        <p className="col-span-1 text-2xl font-bold text-gray-400">
                            {index + 1}
                        </p>

                        {/* Title */}
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