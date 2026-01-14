
import LoginUser from "@/components/LoginUser";
// import "./globals.css";
import MenuTransparencia from "@/components/MenuTransparencia";

export default function TransparenciaLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full h-screen pt-24 bg-white flex flex-col justify-center items-center">
            <LoginUser />
            <div className="w-full h-full max-h-screen flex flex-row justify-around">
                <MenuTransparencia />
                {children}
            </div>
        </div>
    );
}
