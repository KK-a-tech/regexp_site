'use client';

import { useState } from 'react';
import Header from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import Sidebar from "@/components/layout/Sidebar";
import CodeBlock from "@/components/ui/CodeBlock";


// セクションコンポーネント
const CheatSheetSection = ({ 
  title, 
  items 
}: { 
  title: string; 
  items: Array<{ pattern: string; description: string; example?: string }> 
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <div className="w-full mb-2">
            <CodeBlock>{item.pattern}</CodeBlock>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
          {item.example && (
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              例: {item.example}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default function CheatSheetPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // チートシートデータ
  const cheatSheetData = {
    basic: [
      { pattern: ".", description: "任意の1文字にマッチ（改行文字以外）", example: "a.c → abc, adc" },
      { pattern: "^", description: "行の開始", example: "^Hello → 行頭のHello" },
      { pattern: "$", description: "行の終了", example: "end$ → 行末のend" },
      { pattern: "*", description: "直前の文字が0回以上", example: "ab*c → ac, abc, abbc" },
      { pattern: "+", description: "直前の文字が1回以上", example: "ab+c → abc, abbc" },
      { pattern: "?", description: "直前の文字が0回または1回", example: "colou?r → color, colour" },
    ],
    quantifiers: [
      { pattern: "{n}", description: "ちょうどn回", example: "a{3} → aaa" },
      { pattern: "{n,}", description: "n回以上", example: "a{2,} → aa, aaa, aaaa" },
      { pattern: "{n,m}", description: "n回以上m回以下", example: "a{2,4} → aa, aaa, aaaa" },
      { pattern: "*?", description: "非貪欲マッチ（最小）", example: "<.*?> → <tag>最初のタグのみ" },
      { pattern: "+?", description: "非貪欲マッチ（最小）", example: "a+? → 最小のa" },
    ],
    character: [
      { pattern: "\\d", description: "数字 [0-9]", example: "\\d+ → 123, 456" },
      { pattern: "\\D", description: "数字以外", example: "\\D+ → abc, xyz" },
      { pattern: "\\w", description: "単語文字 [a-zA-Z0-9_]", example: "\\w+ → word123" },
      { pattern: "\\W", description: "単語文字以外", example: "\\W+ → !@#$" },
      { pattern: "\\s", description: "空白文字", example: "\\s+ → スペース、タブ" },
      { pattern: "\\S", description: "空白文字以外", example: "\\S+ → text" },
      { pattern: "\\n", description: "改行文字", example: "line1\\nline2" },
      { pattern: "\\t", description: "タブ文字", example: "word1\\tword2" },
    ],
    classes: [
      { pattern: "[abc]", description: "a、b、cのいずれか", example: "[aeiou] → 母音" },
      { pattern: "[^abc]", description: "a、b、c以外", example: "[^0-9] → 数字以外" },
      { pattern: "[a-z]", description: "小文字のa〜z", example: "[a-z]+ → 小文字の単語" },
      { pattern: "[A-Z]", description: "大文字のA〜Z", example: "[A-Z]+ → 大文字の単語" },
      { pattern: "[0-9]", description: "数字の0〜9", example: "[0-9]{4} → 4桁の数字" },
      { pattern: "[a-zA-Z]", description: "英字", example: "[a-zA-Z]+ → 英単語" },
    ],
    groups: [
      { pattern: "(abc)", description: "グループ化とキャプチャ", example: "(\\d{4})-(\\d{2}) → 年-月" },
      { pattern: "(?:abc)", description: "非キャプチャグループ", example: "(?:Mr|Ms)\\.\\s+(\\w+)" },
      { pattern: "\\1", description: "後方参照（1番目のグループ）", example: "(\\w+)\\s+\\1 → 重複した単語" },
      { pattern: "(?=abc)", description: "先読み", example: "\\d+(?=px) → pxの前の数字" },
      { pattern: "(?!abc)", description: "否定先読み", example: "\\d+(?!px) → px以外の前の数字" },
      { pattern: "(?<=abc)", description: "後読み", example: "(?<=\\$)\\d+ → $の後の数字" },
    ],
    anchors: [
      { pattern: "\\b", description: "単語境界", example: "\\bword\\b → 単語としてのword" },
      { pattern: "\\B", description: "単語境界以外", example: "\\Bword\\B → 部分文字列のword" },
      { pattern: "\\A", description: "文字列の開始", example: "\\AStart → 文字列開始のStart" },
      { pattern: "\\Z", description: "文字列の終了", example: "End\\Z → 文字列終了のEnd" },
    ],
    flags: [
      { pattern: "i", description: "大文字小文字を区別しない", example: "/hello/i → Hello, HELLO" },
      { pattern: "g", description: "グローバル検索", example: "/a/g → すべてのa" },
      { pattern: "m", description: "複数行モード", example: "^start → 各行の開始" },
      { pattern: "s", description: "単一行モード（.が改行にマッチ）", example: "/.*/s → 改行を含む全体" },
      { pattern: "x", description: "拡張モード（空白とコメントを無視）", example: "# コメント可能" },
    ]
  };

  const categories = [
    { id: 'all', name: 'すべて' },
    { id: 'basic', name: '基本構文' },
    { id: 'quantifiers', name: '量詞' },
    { id: 'character', name: '文字クラス' },
    { id: 'classes', name: 'カスタムクラス' },
    { id: 'groups', name: 'グループ化' },
    { id: 'anchors', name: 'アンカー' },
    { id: 'flags', name: 'フラグ' },
  ];

  // フィルタリング関数
  const filterData = () => {
    if (selectedCategory === 'all') {
      return Object.entries(cheatSheetData);
    }
    return [[selectedCategory, cheatSheetData[selectedCategory as keyof typeof cheatSheetData]]];
  };

  const filteredData = filterData().filter(([_, items]) => 
    items.some(item => 
      item.pattern.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">正規表現チートシート</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">よく使用される正規表現パターンのクイックリファレンス</p>
          </div>
          {/* 検索とフィルター */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="パターンや説明で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* チートシートセクション */}
          <div className="space-y-8">
            {filteredData.map(([categoryKey, items]) => {
              const categoryName = categories.find(cat => cat.id === categoryKey)?.name || categoryKey;
              return (
                <CheatSheetSection
                  key={categoryKey}
                  title={categoryName}
                  items={items}
                />
              );
            })}
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                検索条件に一致するパターンが見つかりませんでした。
              </p>
            </div>
          )}

          {/* よく使用されるパターン例 */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">実用的なパターン例</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">検証パターン</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">メールアドレス</p>
                    <CodeBlock>{"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"}</CodeBlock>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">URL</p>
                    <CodeBlock>{"https?://[\\w.-]+(/[\\w._~:/?#[\\]@!$&'()*+,;=-]*)?"}</CodeBlock>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">日本の郵便番号</p>
                    <CodeBlock>{"\\d{3}-\\d{4}"}</CodeBlock>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">抽出パターン</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">HTMLタグ</p>
                    <CodeBlock>{"<([a-zA-Z]+)[^>]*>"}</CodeBlock>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">IPv4アドレス</p>
                    <CodeBlock>{"\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b"}</CodeBlock>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">日付（YYYY-MM-DD）</p>
                    <CodeBlock>{"\\d{4}-\\d{2}-\\d{2}"}</CodeBlock>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
