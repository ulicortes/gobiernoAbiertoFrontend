
import LoginUser from "@/components/LoginUser";
// import "./globals.css";
import MenuTransparencia from "@/components/MenuTransparencia";

export default function TransparenciaLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full h-full flex flex-col bg-white items-center">
            <LoginUser />
            <div className="w-full h-screen flex flex-row justify-around">
                <MenuTransparencia />
                {children}
            </div>
        </div>
    );
}
