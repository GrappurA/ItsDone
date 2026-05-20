"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 2. The Custom Star Component
const BrutalistStarDot = (props) => {
    // Recharts automatically passes cx (X coordinate), cy (Y coordinate), and the data payload
    const { cx, cy, payload } = props;

    // 🚨 UPDATED: Now looking for payload.done_percentage
    const isFilled = payload.done_percentage >= props.doneThreshold;

    return (
        // We offset the SVG by -15px so the center of the star sits exactly on the data line
        <svg x={cx - 15} y={cy - 15} width="30" height="30" viewBox="0 0 24 24" overflow="visible">

            {/* Brutalist Hard Shadow */}
            <polygon
                points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"
                fill="black"
                transform="translate(3, 3)"
            />

            {/* Actual Star */}
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

// 3. The Custom Brutalist Tooltip
const BrutalistTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {

        // Optional: If 'label' (created_at) is a long ugly timestamp, you can format it here cleanly:
        const cleanDate = new Date(label).toLocaleDateString("en-US", { month: "short", day: "numeric" });

        return (
            <div className="bg-white border-4 border-black p-3 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-black text-xl text-black border-b-2 border-black pb-1 mb-1">{cleanDate}</p>
                <p className="font-bold text-lg text-black">
                    Completed: <span className="bg-[#D0FFCE] px-2 py-1 rounded-md border-2 border-black">{payload[0].value}%</span>
                </p>
            </div>
        );
    }
    return null;
};

// 4. The Main Chart Component
export default function StarProgressChart(props) {
    return (
        <div className="w-[600px] h-[350px] bg-[#cefffd] border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

            <h2 className="text-3xl font-black mb-6 text-black tracking-wide">
                Progress Timeline
            </h2>

            <ResponsiveContainer width="100%" height="85%">
                <LineChart data={props.data} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>

                    {/* Subtle grid lines */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeOpacity={0.2} />

                    {/* Thick black axes */}
                    {/* 🚨 UPDATED dataKey to created_at */}
                    <XAxis
                        dataKey="created_at"
                        stroke="#000"
                        strokeWidth={3}
                        tick={{ fill: '#000', fontWeight: 'bold' }}
                        tickFormatter={(timeStr) => new Date(timeStr).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    />
                    <YAxis stroke="#000" strokeWidth={3} tick={{ fill: '#000', fontWeight: 'bold' }} domain={[0, 100]} />

                    {/* Hooking in the custom tooltip */}
                    <Tooltip content={<BrutalistTooltip />} cursor={{ stroke: 'black', strokeWidth: 2, strokeDasharray: '5 5' }} />

                    {/* The Main Line */}
                    <Line
                        type="monotone"
                        dataKey="done_percentage" /* 🚨 UPDATED dataKey */
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
    );
}