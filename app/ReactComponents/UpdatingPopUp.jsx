import Image from "next/image"
import closeImage from './/src/close.png'

export default function UpdatingPopUp(props) {
    return (
        <div className="fixed top-4 right-4 md:top-10 md:right-10 z-[9999] 
        bg-white border-4 border-black 
        shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4
        text-xl md:text-2xl
        flex items-center justify-between
        gap-4
        w-max max-w-[90vw]">
            <p>Updating your data . . .</p>
            <div
                onClick={() => props.setUpdatingDB(false)}
                className="rounded-2xl border-black border-3 p-1 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer"
            >
                <Image src={closeImage} width={20} height={20} alt="close" />
            </div>
        </div>
    )
}