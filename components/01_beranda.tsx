import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import React from "react";

const Beranda = () => {
  return (
    <div id="beranda" className="min-h-screen pt-12 sm:pt-16 lg:py-36 xl:py-48">
      <div className="absolute inset-x-0 top-0 hidden lg:block">
        <div className="py-5">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl"></div>
        </div>
      </div>

      <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div>
          <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg">
            Integer dignissim metus sed elit blandit, eu rhoncus odio feugiat.
            Etiam sed volutpat metus. Pellentesque pulvinar, ante a ultricies
            aliquam, augue dolor congue risus, vel consectetur urna turpis et
            quam. Quisque aliquet diam dapibus semper maximus.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <Button size="lg" className="rounded-full text-base">
              Lapor <ArrowUpRight className="!h-5 !w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beranda;
