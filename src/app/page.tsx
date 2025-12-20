import Footer from "@/components/Footer";
import InfGestion from "@/components/InfGestion";
import Nav from "@/components/Nav";
import SessionIcon from "@/components/SessionIcon";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans dark:bg-black.">
      <Nav />
      {/* <SessionIcon /> */}
      <InfGestion />
      <Footer />
    </div>
  );
}
