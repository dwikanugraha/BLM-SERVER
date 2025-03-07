import { Navbar } from "@/components/navbar";
import Beranda from "@/components/01_beranda";
import Struktur from "@/components/02_struktur";
import Linimasa from "@/components/03_linimasa";
import Program from "@/components/04_program";
import Aktivitas from "@/components/05_aktivitas";
import Galeri from "@/components/galeri";
import Footer from "@/components/footer";
import Tes from "@/components/tesss";

export default function Home() {
  return (
    <>
      <Navbar />
      <Beranda />
      {/* <Tes /> */}
      <Struktur />
      <Linimasa />
      <Program />
      <Aktivitas />
      <Galeri />
      <Footer />
    </>
  );
}
