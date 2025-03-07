"use client"
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Post {
  id: number;
  title: string;
  content: any[];
  kegiatan: string;
  image?: {
    url: string;
    formats: {
      thumbnail?: { url: string; width: number; height: number };
      small?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
    };
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const Aktivitas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:1337/api/aktivitas-p?populate=*");
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Function to extract a brief description from content
  const extractDescription = (content: any[]) => {
    if (!content || !Array.isArray(content)) return "";
    
    // Find the first paragraph with non-empty text
    const firstParagraph = content.find(
      item => item.type === "paragraph" && 
      item.children && 
      item.children[0] && 
      item.children[0].text && 
      item.children[0].text.trim() !== ""
    );
    
    if (firstParagraph && firstParagraph.children[0]) {
      // Limit to around 120 characters and add ellipsis if needed
      const text = firstParagraph.children[0].text;
      return text.length > 120 ? `${text.substring(0, 120)}...` : text;
    }
    
    return "";
  };

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Calculate read time (approximately 200 words per minute)
  const calculateReadTime = (content: any[]) => {
    if (!content || !Array.isArray(content)) return "1 min read";
    
    let wordCount = 0;
    content.forEach(item => {
      if (item.children && Array.isArray(item.children)) {
        item.children.forEach((child: any) => {
          if (child.text) {
            wordCount += child.text.split(/\s+/).filter(Boolean).length;
          }
        });
      }
    });
    
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${minutes} min read`;
  };

  // Responsive posts per page
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pagination calculations
  const postsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const currentPosts = posts.slice(indexOfLastPost - postsPerPage, indexOfLastPost);

  // Visible page numbers (always show 3 consecutive numbers)
  const getVisiblePages = () => {
    let startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(startPage + 2, totalPages);
    
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

  if (loading) {
    return (
      <div id="aktivitas" className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Aktivitas</h2>
        </div>
        <div className="flex justify-center items-center min-h-[300px]">
          <p>Loading aktivitas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="aktivitas" className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Aktivitas</h2>
        </div>
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div id="aktivitas" className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Aktivitas</h2>
      </div>

      {posts.length === 0 ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p>Tidak ada aktivitas yang tersedia.</p>
        </div>
      ) : (
        <>
          {/* Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
            {currentPosts.map((post) => (
              <Card key={post.id} className="shadow-none overflow-hidden rounded-md">
                <CardHeader className="p-0">
                  {post.image ? (
                    <div className="relative aspect-video w-full border-b overflow-hidden">
                      <Image 
                        src={`http://localhost:1337${post.image.formats?.medium?.url || post.image.url}`}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted w-full border-b" />
                  )}
                </CardHeader>
                <CardContent className="py-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="secondary" className="text-primary shadow-none">
                    {post.kegiatan}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {calculateReadTime(post.content)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight mb-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {extractDescription(post.content)}
                  </p>
                  <Button variant="ghost" className="pl-5 -translate-x-4 w-24">
                    Baca <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination - only show if there are multiple pages */}
          {totalPages > 1 && (
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
          )}
        </>
      )}
    </div>
  );
};

export default Aktivitas;