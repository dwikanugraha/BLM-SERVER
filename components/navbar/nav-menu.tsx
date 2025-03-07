"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { useState, useRef, useEffect, useMemo } from "react";

export const NavMenu = (props: NavigationMenuProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  
  // Determine if this is vertical mode (mobile)
  const isVertical = props.orientation === "vertical";

  // Get menu items for easier handling
  const menuItems = useMemo(() => [
    { label: "Beranda", href: "#beranda" },
    { label: "Struktur", href: "#struktur" },
    { label: "Linimasa", href: "#linimasa" },
    { label: "Program", href: "#program" },
    { label: "Aktivitas", href: "#aktivitas" },
  ], []);

  useEffect(() => {
    if (!isVertical && hoveredIndex !== null) {
      const hoveredElement = itemRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex, isVertical]);

  useEffect(() => {
    if (!isVertical) {
      const activeElement = itemRefs.current[activeIndex];
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement;
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [activeIndex, isVertical]);

  useEffect(() => {
    if (!isVertical) {
      requestAnimationFrame(() => {
        const overviewElement = itemRefs.current[0];
        if (overviewElement) {
          const { offsetLeft, offsetWidth } = overviewElement;
          setActiveStyle({
            left: `${offsetLeft}px`,
            width: `${offsetWidth}px`,
          });
        }
      });
    }
  }, [isVertical]);

  // Scroll spy effect to track which section is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = menuItems.findIndex((item) => `#${entry.target.id}` === item.href);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { rootMargin: " 100px 0px 0px 0px", threshold: 0.6 } // Adjust offset for header
    );
  
    menuItems.forEach((item) => {
      const section = document.getElementById(item.href.replace("#", ""));
      if (section) observer.observe(section);
    });
  
    return () => observer.disconnect();
  }, [menuItems]);
  

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Smooth scroll function
  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If we're in vertical mode (mobile), render a simpler version
  if (isVertical) {
    return (
      <NavigationMenu {...props}>
        <NavigationMenuList className="gap-6 space-x-0 flex-col items-start">
          {menuItems.map((item, index) => (
            <NavigationMenuItem
              key={index}
              className={`w-full py-2 cursor-pointer ${
                index === activeIndex
                  ? "text-[#0e0e10] dark:text-white font-medium"
                  : "text-[#0e0f1199] dark:text-[#ffffff99]"
              }`}
              onClick={() => {
                setActiveIndex(index);
                scrollToSection(item.href);
              }}
            >
              <NavigationMenuLink asChild className="block w-full">
                <Link href={item.href} className="text-base">
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  // Desktop/horizontal version with all the effects
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-center">

        <div className="p-0 relative">
          <div className="relative">
            {/* Hover Highlight */}
            <div
              className="absolute h-[30px] transition-all duration-300 ease-out bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-[6px] flex items-center "
              style={{
                ...hoverStyle,
                opacity: hoveredIndex !== null ? 1 : 0,
              }}
            />

            {/* Active Indicator */}
            <div
              className="absolute bottom-[-14px] h-[2px] bg-[#0e0f11] dark:bg-white transition-all duration-300 ease-out hidden md:block"
              style={activeStyle}
            />

            {/* Navigation Menu Component */}
            <NavigationMenu {...props}>
              <NavigationMenuList className="flex space-x-[6px] items-center">
                {menuItems.map((item, index) => (
                  <NavigationMenuItem 
                    key={index}
                    ref={(el) => {
                      // Use functional update to ensure correct type
                      itemRefs.current[index] = el;
                    }}
                    className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${
                      index === activeIndex
                        ? "text-[#0e0e10] dark:text-white"
                        : "text-[#0e0f1199] dark:text-[#ffffff99]"
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => {
                      setActiveIndex(index);
                      scrollToSection(item.href);
                    }}
                  >
                    <NavigationMenuLink asChild>
                      <Link 
                        href={item.href}
                        className="text-sm font-[var(--www-mattmannucci-me-geist-regular-font-family)] leading-5 whitespace-nowrap flex items-center justify-center h-full"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default anchor behavior
                          scrollToSection(item.href);
                        }}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </header>
  );
};