import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Home, Truck, Package, ShoppingBag, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { color } from "framer-motion";

interface TimelineItem {
  title: string;
  date: string;
  description: string;
  isActive: boolean;
  icon: "ordered" | "shipped" | "transit" | "out-for-delivery" | "delivered";
  expectedDelivery?: boolean;
}

interface OrderTimelineProps {
  items?: TimelineItem[];
  className?: string;
}

/**
 * Contoh data default (bisa dihilangkan atau diganti dengan props)
 */
const defaultItems: TimelineItem[] = [
  {
    title: "Order Placed",
    date: "08/06/2023",
    description:
      "Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum morbi blandit cursus risus.",
    isActive: true,
    icon: "ordered",
  },
  {
    title: "Order Shipped",
    date: "09/06/2023",
    description:
      "Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum morbi blandit cursus risus.",
    isActive: true,
    icon: "shipped",
  },
  {
    title: "In Transit",
    date: "10/06/2023",
    description:
      "Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum morbi blandit cursus risus.",
    isActive: true,
    icon: "transit",
  },
  {
    title: "Out for Delivery",
    date: "12/06/2023",
    description:
      "Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum morbi blandit cursus risus.",
    isActive: true,
    icon: "out-for-delivery",
  },
  {
    title: "Delivered",
    date: "12/08/2023",
    description:
      "Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum morbi blandit cursus risus.",
    isActive: false,
    icon: "delivered",
    expectedDelivery: true,
  },
];

const OrderTimeline: React.FC<OrderTimelineProps> = ({
  items = defaultItems,
  className,
}) => {
  return (
    <div className={cn("relative space-y-8 -top-0 md:-top-4", className)}>
      {/* Garis timeline di tengah / kiri */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-current via-slate-400 to-transparent" />

      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "relative flex items-start",
            // Untuk layar >= md, item ganjil akan di-reverse agar bergantian kiri/kanan
            index % 2 !== 0 && ""
          )}
        >
          {/* Icon + Tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-md bg-white dark:bg-black",
                  )}
                >
                  {getItemIcon(item.icon)}
                </div>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>

          {/* Card Konten */}
          <Card
            className={cn(
              // Beri sedikit margin agar card tidak menempel ke icon
              "ml-4 w-[calc(100%-4rem)] transition-opacity",
              // Sedikit efek transparan untuk item yang belum aktif
              !item.isActive && "opacity-80",
              // Pengaturan posisi card di kiri/kanan
              index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
            )}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">
                  {item.title}
                </CardTitle>
                <Badge
                  variant={
                    item.expectedDelivery
                      ? "outline"
                      : item.isActive
                      ? "default"
                      : "secondary"
                  }
                >
                  {item.expectedDelivery ? "Expected: " : ""}
                  {item.date}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-slate-500">
              {item.description}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

/**
 * Fungsi helper untuk memilih icon sesuai status
 */
function getItemIcon(icon: TimelineItem["icon"]) {
  const size = 20;
  const iconProps = { size, strokeWidth: 2};

  switch (icon) {
    case "ordered":
      return <ShoppingBag {...iconProps} />;
    case "shipped":
      return <Package {...iconProps} />;
    case "transit":
      return <Truck {...iconProps} />;
    case "out-for-delivery":
      return <Clock {...iconProps} />;
    case "delivered":
      return <Home {...iconProps} />;
    default:
      return <Check {...iconProps} />;
  }
}


export default OrderTimeline;
