"use client";

import React from "react";
import { useState } from 'react';
import Header from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import Sidebar from "@/components/layout/Sidebar";

export default function TermsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">利用規約</h1>
        <p className="mb-4">
            この利用規約（以下、「本規約」といいます。）は、本サイトの提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。利用者の皆さまには、本規約に従って本サービスをご利用いただきます。
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">第1条（適用）</h2>
        <p className="mb-4">
            本規約は、利用者と当サイト運営者との間の本サービスの利用に関わる一切の関係に適用されるものとします。
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">第2条（禁止事項）</h2>
        <p className="mb-4">
            利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。
        </p>
        <ul className="list-disc list-inside mb-4">
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>不正アクセスやその他不正行為</li>
            <li>その他、当サイトが不適切と判断する行為</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">第3条（免責事項）</h2>
        <p className="mb-4">
            本サービスの内容について、正確性や完全性を保証するものではありません。利用者が本サービスを利用することによって生じたいかなる損害についても、一切の責任を負いません。
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">第4条（規約の変更）</h2>
        <p className="mb-4">
            当サイトは、必要と判断した場合には、利用者に通知することなく本規約を変更することができます。変更後の利用規約は、本サイトに掲載した時点で効力を生じるものとします。
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">第5条（準拠法・裁判管轄）</h2>
        <p className="mb-4">
            本規約の解釈にあたっては、日本法を準拠法とします。また、本サービスに関して紛争が生じた場合には、運営者の所在地を管轄する裁判所を専属的合意管轄とします。
        </p>

        <p className="mt-8">制定日: 2025年6月28日</p>
        </main>
      </div>
      <Footer />
    </div>
  );
};
