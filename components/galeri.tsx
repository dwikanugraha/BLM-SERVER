"use client"
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { useEffect, useState } from "react";

interface Photo {
  url: string;
  // Tambahkan properti lain jika diperlukan
}

interface GaleriData {
  id: number;
  photo: Photo[];
  // Tambahkan properti lain sesuai response API
}

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <div
      className={cn(
        "relative h-60 w-80 overflow-hidden rounded-xl border",
        "border-gray-950/[.1] bg-gray-950/[.01] dark:border-gray-50/[.1] dark:bg-gray-50/[.10]"
      )}
    >
      <img className="h-full w-full object-cover" src={img} alt="" />
    </div>
  );
};

export function MarqueeDemo() {
  const [galleryData, setGalleryData] = useState<GaleriData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/galeris?populate=*');
        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }
        const data = await response.json();
        setGalleryData(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Memuat...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!galleryData || galleryData.length === 0) return <div>Tidak ada data</div>;

  const firstRow = galleryData[0].photo.map((photo) => 
    `http://localhost:1337${photo.url}`
  );

  return (
    <Marquee pauseOnHover className="py-8">
      {firstRow.map((img, index) => (
        <ReviewCard key={index} img={img} />
      ))}
    </Marquee>
  );
}

export default MarqueeDemo;