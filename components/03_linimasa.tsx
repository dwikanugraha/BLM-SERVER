import React from "react";
import { Button } from "@/components/ui/button";
import OrderTimeline from "./tesss";

interface Feature {
  image: string;
  title: string;
  description: string;
}

interface Timeline3Props {
  heading?: string;
  description?: string;
  buttons?: {
    primary: {
      text: string;
      url: string;
    };
    secondary: {
      text: string;
      url: string;
    };
  };
  features?: Feature[];
}

const Timeline3 = ({
  heading = "Linimasa",
  description = "We believe in creating lasting partnerships with our clients, focusing on long-term success through collaborative innovation and dedicated support.",
  buttons = {
    primary: {
      text: "Start Now",
      url: "#",
    },
    secondary: {
      text: "Book a demo",
      url: "#",
    },
  },
  features = [
    {
      image: "https://shadcnblocks.com/images/block/placeholder-4.svg",
      title: "Dedicated Support",
      description:
        "Expanded operations to 5 new countries, reaching millions of new users.",
    },
    {
      image: "https://shadcnblocks.com/images/block/placeholder-5.svg",
      title: "Series B Funding",
      description:
        "Secured $50M in Series B funding to accelerate product development.",
    },
    {
      image: "https://shadcnblocks.com/images/block/placeholder-5.svg",
      title: "Product Launch",
      description: "Successfully launched our flagship product to market.",
    },
    {
      image: "https://shadcnblocks.com/images/block/placeholder-5.svg",
      title: "Company Founded",
      description: "Started with a vision to revolutionize the industry.",
    },
  ],
}: Timeline3Props) => {
  return (
    <section
      id="linimasa"
      className="flex min-h-screen items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-0 py-16"
    >
      <div className="container max-w-7xl">
        <div className="relative grid md:gap-16 md:grid-cols-2">
          {/* Bagian Kiri (Teks, Heading, Tombol) */}
          <div className="top-40 h-fit md:sticky">
            <h2 className="mb-6 mt-4 text-4xl font-semibold md:text-5xl">
              {heading}
            </h2>
            <p className="font-medium text-muted-foreground text-[17px]">
              {description}
            </p>
          </div>

          {/* Bagian Kanan (Timeline) */}
          <div>
            <OrderTimeline />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline3;
