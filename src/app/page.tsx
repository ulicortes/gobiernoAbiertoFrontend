import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans dark:bg-black.">
      <Nav />
      <Footer />
    </div>
  );
}
