"use client";

import { PackageCheck, ShoppingCart, Truck } from "lucide-react";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";

export function Linimasa() {
  return (
    <div
      id="linimasa"
      className="max-w-screen-xl mx-auto py-8 md:py-16 px-4 sm:px-6 xl:px-0 overflow-x-auto"
    >
      <div className="text-center max-w-xl mx-auto">
        <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
          Linimasa
        </h2>
      </div>
      <Timeline
        orientation="horizontal"
        className="mt-12 w-full min-h-40 min-w-[600px] md:min-w-full"
      >
        {/* Item 1 - Ordered */}
        <TimelineItem className="flex-1">
          <TimelineSeparator>
            <TimelineDot className="p-2 bg-primary/10 text-primary">
              <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
            </TimelineDot>
            <TimelineConnector className="flex-1 h-[2px] md:h-[3px] bg-gray-300" />
          </TimelineSeparator>
          <TimelineContent className="mt-2 md:mt-4">
            <TimelineTitle className="text-sm md:text-base font-semibold">
              Ordered
            </TimelineTitle>
            <TimelineDescription className="text-xs md:text-sm mt-1 whitespace-nowrap">
              9.15 AM, January 1, 2024
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        {/* Item 2 - Shipped */}
        <TimelineItem className="flex-1">
          <TimelineSeparator>
            <TimelineConnector className="flex-1 h-[2px] md:h-[3px] bg-gray-300" />
            <TimelineDot className="p-2 bg-primary/10 text-primary">
              <PackageCheck className="h-4 w-4 md:h-5 md:w-5" />
            </TimelineDot>
            <TimelineConnector className="flex-1 h-[2px] md:h-[3px] bg-gray-300" />
          </TimelineSeparator>
          <TimelineContent className="mt-2 md:mt-4">
            <TimelineTitle className="text-sm md:text-base font-semibold">
              Shipped
            </TimelineTitle>
            <TimelineDescription className="text-xs md:text-sm mt-1 whitespace-nowrap">
              12:20 PM, January 4, 2024
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        {/* Item 3 - Out for Delivery */}
        <TimelineItem className="flex-1">
          <TimelineSeparator>
            <TimelineConnector className="flex-1 h-[2px] md:h-[3px] bg-gray-300" />
            <TimelineDot className="p-2 bg-primary/10 text-primary">
              <Truck className="h-4 w-4 md:h-5 md:w-5" />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="mt-2 md:mt-4">
            <TimelineTitle className="text-sm md:text-base font-semibold">
              Out for Delivery
            </TimelineTitle>
            <TimelineDescription className="text-xs md:text-sm mt-1 whitespace-nowrap">
              07:00 AM, January 8, 2024
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

export default Linimasa;
