import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import React from "react";

const Beranda = () => {
  return (
    <div id="beranda" className="min-h-screen pt-12 sm:pt-16 lg:py-36 xl:py-48 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-0">
      <div className="absolute inset-x-0 top-0 hidden lg:block">
      </div>
      <div className="absolute inset-0 z-0">
        <img 
          src="tes.png"
          alt="Background" 
          className="w-full h-full object-cover"
        />
        {/* Optional overlay for better text readability */}
      </div>
      <div className="relative max-w-screen-xl w-full mx-auto">
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