"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

interface CategoryClientProps {
  categoryName: string;
  initialProducts: any[];
}

export default function CategoryClient({ categoryName, initialProducts }: CategoryClientProps) {
  const [products] = useState<any[]>(initialProducts || []);
  const [sortBy, setSortBy] = useState("Latest Arrivals");

  // Client-side sorting logic
  const getSortedProducts = () => {
    const sorted = [...products];
    if (sortBy === "Price: Low to High") {
      return sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      return sorted.sort((a, b) => b.price - a.price);
    }
    // Default: Latest Arrivals (sorted by created_at)
    return sorted;
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f4]">
      <Header />
      <main className="flex-1 py-6 md:py-10 pb-20 md:pb-12">
        <div className="container-custom">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-4 md:mb-6 px-1">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{categoryName}</span>
          </div>

          <div className="bg-white rounded-md p-4 md:p-6 shadow-sm border border-gray-100 min-h-[450px] flex flex-col">
            {/* Category Title Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4 md:pb-6 mb-6">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">{categoryName}</h1>
                <p className="text-xs md:text-sm text-gray-400 mt-1">
                  {products.length} products found
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm text-gray-500 font-medium">Sort By:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-md px-3 py-1.5 text-xs md:text-sm bg-white font-medium text-gray-700 outline-none focus:border-primary"
                >
                  <option>Latest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products Display */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    price={product.price}
                    oldPrice={product.oldPrice}
                    image={product.image}
                  />
                ))}
              </div>
            ) : (
              /* No Products Found State */
              <div className="flex-1 flex flex-col items-center justify-center text-center py-10 px-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">এই ক্যাটাগরিতে কোনো প্রোডাক্ট পাওয়া যায়নি</h3>
                <p className="text-gray-400 text-xs md:text-sm max-w-sm mb-6 leading-relaxed">
                  দুঃখিত, বর্তমানে "{categoryName}" ক্যাটাগরির কোনো প্রোডাক্ট আমাদের ডাটাবেজে স্টকে নেই। অনুগ্রহ করে অন্য কোনো ক্যাটাগরি ট্রাই করুন।
                </p>
                <div className="flex gap-3">
                  <Link href="/" className="bg-[#1a80c2] text-white px-6 py-2 rounded-md text-xs md:text-sm font-bold hover:bg-[#146ba3] transition-colors shadow-sm">
                    হোমপেজে ফিরে যান
                  </Link>
                  <Link href="/categories" className="border border-gray-200 text-gray-600 px-6 py-2 rounded-md text-xs md:text-sm font-bold hover:bg-gray-50 transition-colors">
                    অন্যান্য ক্যাটাগরি
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
