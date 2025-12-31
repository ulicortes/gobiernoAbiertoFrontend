import LoginUser from "@/components/LoginUser";
import MenuTransparencia from "@/components/MenuTransparencia";

export default function Page() {
    
    return <div className="w-full h-full flex flex-col bg-white items-center">
        <LoginUser />
        <div className="w-full h-screen flex flex-row justify-around">
            <MenuTransparencia />
            <h1 className="w-2/4 text-black">TRANSPARENCIA</h1>
        </div>
    </div>
}