import Image from "next/image"
import closeImage from './/src/close.png'

export default function UpdatingPopUp(props) {
    return (
        <div className="fixed top-1/7 right-1/100 z-[9999] 
        bg-white border-4 border-black 
        shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4
        text-2xl
        flex
        items-center justify-center
        gap-1
        w-fit">
            <p>Updating your data . . .</p>
            <div onClick={() => {
                props.setUpdatingDB(false)
            }} className="rounded-2xl border-black border-3 p-1 hover:scale-115  transition-all duration-300 ease-in-out">
                <Image src={closeImage} width={20} height={30} alt="button to close the pop-up" />
            </div>
        </div>
    )
}