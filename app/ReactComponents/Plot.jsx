"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BrutalistStarDot = (props) => {
    const { cx, cy, payload } = props;
    const isFilled = payload.done_percentage >= props.doneThreshold;

    return (
        <svg x={cx - 21} y={cy - 21} width="42" height="42" viewBox="-2 -2 30 30" overflow="visible">
            <polygon
                points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"
                fill="black"
                transform="translate(4, 4)"
            />
            <polygon
                points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"
                fill={isFilled ? "#fff770" : "#ffffff"}
                stroke="black"
                strokeWidth="2.5"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const BrutalistTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const cleanDate = new Date(label).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        return (
            <div className="bg-white border-4 border-black p-2 md:p-3 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-black text-lg md:text-xl text-black border-b-2 border-black pb-1 mb-1">{cleanDate}</p>
                <p className="font-bold text-base md:text-lg text-black">
                    Completed: <span className="bg-[#D0FFCE] px-2 py-1 rounded-md border-2 border-black">{payload[0].value}%</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function StarProgressChart(props) {
    const [dayCount, setDayCount] = React.useState(7)
    let data = React.useMemo(() => {
        return props.data.slice(0, dayCount)
    }, [props.data, dayCount])

    return (
        // 🚨 1. RESPONSIVE FIX: w-full max-w-[600px] and flex-col
        <div className="w-full max-w-[600px] h-[400px] md:h-[450px] flex flex-col bg-[#cefffd] border-4 border-black rounded-2xl p-3 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

            {/* 🚨 2. HEADER FIX: Stack on mobile (flex-col), side-by-side on desktop (md:flex-row) */}
            <div className='flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-4 md:gap-0 mb-4'>

                <h2 className="text-2xl md:text-3xl font-black text-black tracking-wide m-0">
                    Progress Timeline
                </h2>

                {/* 🚨 3. BUTTONS FIX: Fixed invalid width, added flex-1 so buttons spread evenly on mobile */}
                <div className='flex w-full md:w-auto border-4 border-black rounded-xl md:rounded-2xl p-0 text-base md:text-xl bg-white overflow-hidden'>
                    <button onClick={() => setDayCount(7)} className="flex-1 md:flex-none border-r-4 border-black p-1 md:p-2 hover:bg-green-300 hover:scale-105 active:bg-green-400 transition-all">7d</button>
                    <button onClick={() => setDayCount(14)} className="flex-1 md:flex-none border-r-4 border-black p-1 md:p-2 hover:bg-green-300 hover:scale-105 active:bg-green-400 transition-all">14d</button>
                    <button onClick={() => setDayCount(30)} className="flex-1 md:flex-none border-r-4 border-black p-1 md:p-2 hover:bg-green-300 hover:scale-105 active:bg-green-400 transition-all">30d</button>
                    <button onClick={() => setDayCount(183)} className="flex-1 md:flex-none border-r-4 border-black p-1 md:p-2 hover:bg-green-300 hover:scale-105 active:bg-green-400 transition-all">6mo</button>
                    <button onClick={() => setDayCount(365)} className="flex-1 md:flex-none p-1 md:p-2 hover:bg-green-300 hover:scale-105 active:bg-green-400 transition-all">1y</button>
                </div>
            </div>

            {/* 🚨 4. CHART WRAPPER FIX: flex-1 ensures it dynamically fills remaining vertical space */}
            <div className="flex-1 min-h-0 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart key={dayCount} data={data} margin={{ top: 15, right: 10, left: -25, bottom: 0 }} >

                        <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeOpacity={0.2} />

                        <XAxis
                            dataKey="created_at"
                            stroke="#000"
                            strokeWidth={3}
                            tick={{ fill: '#000', fontWeight: 'bold' }}
                            tickFormatter={(timeStr) => new Date(timeStr).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            padding={{ bottom: 10, left: 20, right: 20 }}
                        />
                        {/* Shrunk the Y-Axis font size slightly so it doesn't take up too much chart space on mobile */}
                        <YAxis padding={{ bottom: 10 }} stroke="#000" strokeWidth={3} tick={{ fill: '#000', fontWeight: 'bold', fontSize: 16 }} domain={[0, 100]} />

                        <Tooltip content={<BrutalistTooltip />} cursor={{ stroke: 'black', strokeWidth: 2, strokeDasharray: '5 5' }} />

                        <Line
                            type="monotone"
                            dataKey="done_percentage"
                            stroke="#000"
                            strokeWidth={6}
                            dot={<BrutalistStarDot doneThreshold={props.doneThreshold} />}
                            activeDot={{ r: 0 }}
                            animationDuration={1500}
                            animationEasing="ease-out"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}