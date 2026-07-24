import { nerkoOne } from "../fonts/NerkoOne"

export default function StatsDashboard() {

    return (
        <>


            <div className={`bg-[#d0ffce] p-2 ${nerkoOne.className} h-[72.9vh]`} >
                <p className="text-[62px] bg-[#fffdce] w-fit border-4 rounded-2xl mb-3 pl-2 pr-2">Your Stats</p>

                <div className="grid grid-cols-2 gap-6">

                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Card 1: Total Tasks (Blue) */}
                        <div className="bg-[#cefffd] border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                            <p className="text-2xl font-bold text-gray-800 border-b-4 border-black pb-2 mb-4">
                                📝Total Tasks
                            </p>
                            <p className="text-5xl font-black text-black">
                                total tasks
                            </p>
                        </div>

                        {/* Card 2: Completed (Green) */}
                        <div className="bg-[#D0FFCE] border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                            <p className="text-2xl font-bold text-gray-800 border-b-4 border-black pb-2 mb-4">
                                ✅Completed
                            </p>
                            <p className="text-5xl font-black text-black">
                                completed
                            </p>
                        </div>

                        {/* Card 3: Biggest Streak (Pink) */}
                        <div className="bg-[#F2D7EE] border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                            <p className="text-2xl font-bold text-gray-800 border-b-4 border-black pb-2 mb-4">
                                🔥Biggest Streak
                            </p>
                            <p className="text-5xl font-black text-black">
                                lists here
                            </p>
                        </div>

                        {/* Card 4: Average Done (Yellow) */}
                        <div className="bg-[#fffdce] border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                            <p className="text-2xl font-bold text-gray-800 border-b-4 border-black pb-2 mb-4">
                                📊Avg Completion
                            </p>
                            <p className="text-5xl font-black text-black">
                                done here
                            </p>
                        </div>
                    </div>

                    <div className="w-fit">
                        <div className="w-[600px] h-[350px] bg-[#cefffd] border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

                            <div className='flex w-full'>
                                <h2 className="w-[100%] text-3xl font-black mb-6 text-black tracking-wide">
                                    Progress Timeline
                                </h2>

                                <div className='flex w-115 border-5 rounded-2xl p-0 text-2xl overflow-hidden'>
                                    <button className="border-r-4 p-2 hover:bg-green-300 hover:scale-105">7d</button>
                                    <button className="border-r-4 p-2 hover:bg-green-300 hover:scale-105">14d</button>
                                    <button className="border-r-4 p-2 hover:bg-green-300 hover:scale-105">30d</button>
                                    <button className="border-r-4 p-2 hover:bg-green-300 hover:scale-105">6mo</button>
                                    <button className=" p-2 hover:bg-green-300 hover:scale-105">1y</button>
                                </div>
                            </div>

                            <div width="100%" height="85%"></div>

                        </div>
                    </div>

                </div>
            </div >


        </>
    )
}