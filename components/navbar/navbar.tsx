"use client"
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState} from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-0 relative">
        {/* Logo di kiri */}
        <Logo />

        {/* Desktop Menu - Di tengah */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <NavMenu className="hidden md:block" />
        </div>

        {/* Bagian Kanan - Dark Mode + Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Tombol Dark Mode */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;