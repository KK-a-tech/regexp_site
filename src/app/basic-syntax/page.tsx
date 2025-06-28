'use client';

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import CommonPatterns from "@/components/layout/CommonPatterns";

export default function BasicSyntax() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 px-4 sm:px-6 lg:px-12 py-8 lg:ml-64 max-w-[1200px] mx-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                基本構文を学ぶ
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                正規表現の基礎構文を学びましょう。
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              準備中...
            </p>
            <CommonPatterns columns={2} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
