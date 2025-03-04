import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

const reviews = [
  "https://afterschool.id/wp-content/uploads/2022/05/foto-stan-1.jpg",
  "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/01/06/2369602774.jpg",
  "https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/964/2024/05/18/WhatsApp-Image-2024-05-18-at-202634-2294427949.jpeg",
  "https://www.indofira.co.id/images/artikel/473-stan3.jpg",
  "https://asset.kompas.com/crops/x1RKucV4ADUsXtbBt7Y85T6E4yQ=/0x163:561x537/750x500/data/photo/2019/07/31/5d4119cd6e9c7.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9Q1NY8lLDyXrMI058RLGIFR8MzMjtBPOUQ&s",
];

const firstRow = reviews.slice(0, reviews.length);

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <div
      className={cn(
        "relative h-60 w-154 overflow-hidden rounded-xl border",
        "border-gray-950/[.1] bg-gray-950/[.01] dark:border-gray-50/[.1] dark:bg-gray-50/[.10]"
      )}
    >
      <img className="h-full w-full object-cover" src={img} alt="" />
    </div>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((img, index) => (
          <ReviewCard key={index} img={img} />
        ))}
      </Marquee>
    </div>
  );
}

export default MarqueeDemo;