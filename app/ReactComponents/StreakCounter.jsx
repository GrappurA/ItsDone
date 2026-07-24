import Image from "next/image";
import fireIcon from "./src/fire.png";

export default function StreakCounter(props) {

    return (
        <div className="flex flex-row justify-center items-center group cursor-default">
            {/* 'animate-pulse' makes it feel like it's burning, 'hover:animate-bounce' adds extra fun */}
            <div className="rounded-full transition-transform duration-500 group-hover:rotate-[-20deg] group-hover:scale-125">
                <Image src={fireIcon} width={50} height={50} alt="Streak" loading="eager" />
            </div>
            <p className="text-5xl ml-2 font-bold">{props.streakCount}</p>

        </div>
    )
}