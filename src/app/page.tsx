'use client';

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import CodeBlock from "@/components/ui/CodeBlock";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* ヒーローセクション */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                正規表現リファレンス
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                正規表現の包括的なガイド。基本構文から実践的なパターンまで
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#tester"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus-ring"
                >
                  テスターを試す
                </a>
                <a
                  href="#basic-syntax"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus-ring"
                >
                  基本構文を学ぶ
                </a>
              </div>
            </div>

            {/* クイックスタート */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">クイックスタート</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">基本パターン</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">文字、数字、特殊文字のマッチング方法</p>
                  <code className="text-sm">a-z A-Z 0-9 \d \w \s</code>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">量詞</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">繰り返しの指定方法</p>
                  <code className="text-sm">* + ? {'{n}'} {'{n,m}'}</code>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">グループ化</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">パターンのグループ化と参照</p>
                  <code className="text-sm">() (?:) \1 \2</code>
                </div>
              </div>
            </section>


            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">よく使用されるパターン</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">メールアドレス</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">基本的な検証パターン</span>
                  </div>
                  <CodeBlock>{"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"}</CodeBlock>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">URL</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">HTTP/HTTPS URL</span>
                  </div>
                  <CodeBlock>{"https?://[-\\w.]+(:\\d+)?(/([\\w/_.])*)?}"}</CodeBlock>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">電話番号（日本）</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">ハイフンあり/なし</span>
                  </div>
                  <CodeBlock>{"0\\d{1,4}-?\\d{1,4}-?\\d{4}"}</CodeBlock>
                </div>
              </div>
            </section>

            {/* 学習リソース */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">学習リソース</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">初心者向け</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li><a href="#" className="content-link">正規表現とは？</a></li>
                    <li><a href="#" className="content-link">基本的な文字マッチング</a></li>
                    <li><a href="#" className="content-link">メタ文字の使い方</a></li>
                    <li><a href="#" className="content-link">実践的な例題</a></li>
                  </ul>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">上級者向け</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li><a href="#" className="content-link">先読み・後読み</a></li>
                    <li><a href="#" className="content-link">条件分岐</a></li>
                    <li><a href="#" className="content-link">パフォーマンス最適化</a></li>
                    <li><a href="#" className="content-link">言語固有の機能</a></li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
