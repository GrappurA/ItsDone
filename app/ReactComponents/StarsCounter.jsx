import Image from "next/image";
import starIcon from "./src/starIcon.png";

export default function StarsCounter(props) {

    return (
        <div className="flex flex-row justify-center items-center group cursor-default">
            <div className="rounded-full transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-125">
                <Image src={starIcon} width={50} height={50} alt="Star" loading="eager" />
            </div>
            <p className="text-5xl ml-2 font-bold">{props.starsCount}</p>
        </div>
    )
}