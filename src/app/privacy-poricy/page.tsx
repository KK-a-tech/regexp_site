'use client';

import React, { useState } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";

export default function PrivacyPolicy() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8 text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">プライバシーポリシー</h1>
            
            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">1. はじめに</h2>
                <p>本プライバシーポリシーは、当サイト（以下、「当サイト」といいます）が提供するサービスの利用者から取得する個人情報の取り扱い方針を定めるものです。当サイトの利用者は、本ポリシーに同意したものとみなします。</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">2. 情報の取得</h2>
                <p>当サイトは、サービスの提供、改善、および利用者との円滑なコミュニケーションのために、利用者から以下の情報を取得することがあります。</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>利用者が自ら提供する情報（例：名前、メールアドレス、お問い合わせ内容）</li>
                  <li>サービスの利用に伴い自動的に収集される情報（例：IPアドレス、Cookie、閲覧履歴）</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">3. 情報の利用目的</h2>
                <p>取得した情報は、以下の目的のために利用します。</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>当サイトのサービスの提供および運営のため</li>
                  <li>利用者からのお問い合わせに対応するため</li>
                  <li>当サイトのサービス向上、新規開発のため</li>
                  <li>利用規約に違反した利用者の特定や、その他不正・不当な目的でサービスを利用しようとする利用者の利用をお断りするため</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">4. 情報の第三者提供</h2>
                <p>当サイトは、法令に基づく場合や、人の生命、身体または財産の保護のために必要がある場合を除き、利用者の同意なく個人情報を第三者に提供しません。</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">5. Cookie（クッキー）の使用について</h2>
                <p>当サイトは、利用者の利便性向上やサイト分析のためにCookieを使用することがあります。利用者はブラウザの設定によりCookieを無効化することができますが、その場合、一部のサービスが利用できなくなる可能性があります。</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">6. 免責事項</h2>
                <p>当サイトは、提供する情報の正確性、完全性、有用性について万全を期しておりますが、いかなる保証も行うものではありません。当サイトの利用によって利用者に生じたいかなる損害についても、当サイトは一切の責任を負いません。</p>
                <p className="mt-2">当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">7. 著作権</h2>
                <p>当サイトに掲載されているコンテンツ（文章、画像、動画など）の著作権は、当サイトまたは正当な権利者に帰属します。法律で認められている引用の範囲を超えて、無断で転載、複製、販売などを行うことを禁じます。</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">8. プライバシーポリシーの変更</h2>
                <p>当サイトは、法令の改正や運営方針の変更に伴い、本プライバシーポリシーを事前の予告なく変更することがあります。変更後のポリシーは、当サイトに掲載したときから効力を生じるものとします。</p>
              </section>
              
              <section>
                 <p>最終更新日: 2025年6月28日</p>
              </section>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
