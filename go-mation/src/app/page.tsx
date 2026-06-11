import Image from "next/image";
import Nav from "@/components/Navi";
import Footer from "@/components/Footer";
import PublicHome from "@/components/PublicHome";

export default function Home() {
  return (
    <div className="w-full bg-white min-h-screen">
      <Nav />
      <PublicHome />
      <Footer />
    </div>
  );
}
