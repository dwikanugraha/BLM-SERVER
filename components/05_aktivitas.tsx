"use client"
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface Post {
  id: number;
  category: string;
  readTime: string;
  title: string;
  description: string;
}

const Aktivitas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  
  // Sample data
  const allPosts: Post[] = [
    {
      id: 1,
      category: "Technology",
      readTime: "5 min read",
      title: "A beginner's guide to blockchain for engineers",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
    },
    {
      id: 2,
      category: "Programming",
      readTime: "7 min read",
      title: "How to build scalable applications with React",
      description: "Learn the best practices for building high-performance React applications that scale."
    },
    {
      id: 3,
      category: "Design",
      readTime: "4 min read",
      title: "UI/UX principles for busy developers",
      description: "Simple design principles that can dramatically improve your application's user experience."
    },
    {
      id: 4,
      category: "Technology",
      readTime: "6 min read",
      title: "The future of artificial intelligence",
      description: "Exploring how AI is transforming industries and what it means for software engineers."
    },
    {
      id: 5,
      category: "Programming",
      readTime: "8 min read",
      title: "Getting started with TypeScript",
      description: "A comprehensive guide to TypeScript for JavaScript developers."
    },
    {
      id: 6,
      category: "Cloud",
      readTime: "5 min read",
      title: "Serverless architecture explained",
      description: "Understanding the benefits and trade-offs of serverless computing models."
    },
    {
      id: 7,
      category: "Security",
      readTime: "6 min read",
      title: "Web application security essentials",
      description: "Key security concepts every web developer should know to protect their applications."
    }
  ];

  // Responsive posts per page
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pagination calculations
  const postsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const currentPosts = allPosts.slice(indexOfLastPost - postsPerPage, indexOfLastPost);

  // Visible page numbers (always show 3 consecutive numbers)
  const getVisiblePages = () => {
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(startPage + 2, totalPages);
    
    // Adjust if we're at the beginning
    if (endPage - startPage < 2) {
      startPage = Math.max(1, endPage - 2);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  // Pagination handlers
  const handlePrevious = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));
  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div id="aktivitas" className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Aktivitas</h2>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
        {currentPosts.map((post) => (
          <Card key={post.id} className="shadow-none overflow-hidden rounded-md">
            <CardHeader className="p-0">
              <div className="aspect-video bg-muted w-full border-b" />
            </CardHeader>
            <CardContent className="py-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="text-primary shadow-none">
                  {post.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {post.description}
              </p>
              <Button variant="ghost" className="pl-0">
                Read more <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <Pagination className="justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={handlePrevious}
              className={cn(
                "cursor-pointer",
                currentPage === 1 && "opacity-50 pointer-events-none"
              )}
            />
          </PaginationItem>

          {getVisiblePages().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={currentPage === page}
                className={cn(
                  "cursor-pointer",
                  currentPage === page && "bg-primary text-primary-foreground"
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={cn(
                "cursor-pointer",
                currentPage === totalPages && "opacity-50 pointer-events-none"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Aktivitas;