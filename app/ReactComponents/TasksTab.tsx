"use client"

import { useRouter } from "next/navigation"

interface TodoTask {
    id: number
    title: string
    status: boolean
    created_at: string
    list_id: number
}

interface TasksTabProps {
    tasks: {
        data: TodoTask[]
    }
}

// 3. Updated the prop type name
export default function TasksTab({ tasks }: TasksTabProps) {
    const router = useRouter()
    function HandleClick(task) {
        const listId = task.list_id
        const itemId = task.id
        router.push(`/home?listId=${listId}&itemId=${itemId}`)
    }


    return (
        // 1. Reduced padding on mobile (p-4 md:p-6)
        <div className="border-4 border-black rounded-2xl p-4 md:p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">

            {/* 2. THE HEADER ROW: Added 'hidden md:grid' so it disappears on phones! */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b-4 border-black font-black text-2xl mb-4 text-gray-500">
                <div className="col-span-1">#</div>
                <div className="col-span-6">Task Name</div>
                <div className="col-span-3">Status</div>
                <div className="col-span-2">Date</div>
            </div>

            {/* THE DATA ROWS */}
            <div className="flex flex-col gap-4 md:gap-2">
                {tasks.data.map((task, index) => (
                    <div
                        onClick={() => { HandleClick(task) }}

                        key={task.id}
                        className="flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center p-4 md:p-3 border-2 border-black md:border-transparent md:hover:border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-none hover:bg-[#D0FFCE] transition-all duration-200 cursor-pointer"
                    >
                        {/* Index: Completely hidden on mobile */}
                        <p className="hidden md:block col-span-1 text-2xl font-bold text-gray-400">
                            {index + 1}
                        </p>

                        {/* Title: Slightly smaller text on mobile */}
                        <p className="md:col-span-6 text-3xl md:text-4xl font-bold truncate">
                            {task.title}
                        </p>

                        {/* 4. THE WRAPPER TRICK: Flex side-by-side on mobile, but md:contents dissolves the wrapper on desktop so the children rejoin the 12-column grid! */}
                        <div className="flex items-center justify-between mt-3 md:mt-0 md:contents">

                            {/* Status */}
                            <p className={`md:col-span-3 text-2xl md:text-3xl font-black ${task.status ? 'text-green-600' : 'text-gray-600'}`}>
                                {task.status ? "Done ✅" : "Pending ⏳"}
                            </p>

                            {/* Date: Slightly bigger padding on mobile for touch targets */}
                            <p className="md:col-span-2 text-xl md:text-2xl font-mono text-gray-600 bg-gray-100 p-2 md:p-0 md:ml-[-12%] rounded-lg text-center w-fit">
                                {task.created_at.split("T")[0]}
                            </p>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}