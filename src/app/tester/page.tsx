'use client';

import { useState, useEffect } from 'react';

// Mock components - replace with your actual components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import CommonPatterns from "@/components/layout/CommonPatterns";


export default function TesterPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [regex, setRegex] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  // テスト実行
  useEffect(() => {
    if (!regex || !testString) {
      setMatches([]);
      setError('');
      setHighlightedText(testString);
      return;
    }

    try {
      const regexObj = new RegExp(regex, flags);
      const foundMatches = [];
      let match;
      
      if (flags.includes('g')) {
        while ((match = regexObj.exec(testString)) !== null) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
            input: match.input
          });
          if (match.index === regexObj.lastIndex) break;
        }
      } else {
        match = regexObj.exec(testString);
        if (match) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
            input: match.input
          });
        }
      }
      
      setMatches(foundMatches);
      setError('');
      
      // ハイライト表示の作成
      if (foundMatches.length > 0) {
        let highlighted = testString;
        const sortedMatches = [...foundMatches].sort((a, b) => b.index - a.index);
        
        sortedMatches.forEach(match => {
          const before = highlighted.slice(0, match.index);
          const matchText = highlighted.slice(match.index, match.index + match.match.length);
          const after = highlighted.slice(match.index + match.match.length);
          highlighted = before + `<mark class="bg-yellow-200 dark:bg-yellow-600 px-1 rounded">${matchText}</mark>` + after;
        });
        
        setHighlightedText(highlighted);
      } else {
        setHighlightedText(testString);
      }
      
    } catch (err) {
      setError(err.message);
      setMatches([]);
      setHighlightedText(testString);
    }
  }, [regex, flags, testString]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 px-4 sm:px-6 lg:px-12 py-8 lg:ml-64 max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">正規表現テスター</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">正規表現をテストしよう</p>
          </div>

          <div className="space-y-8">
            {/* 正規表現入力セクション */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">正規表現パターン</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    正規表現
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg text-gray-500 dark:text-gray-400">/</span>
                    <input
                      type="text"
                      value={regex}
                      onChange={(e) => setRegex(e.target.value)}
                      placeholder="正規表現を入力してください"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <span className="text-lg text-gray-500 dark:text-gray-400">/</span>
                    <input
                      type="text"
                      value={flags}
                      onChange={(e) => setFlags(e.target.value)}
                      placeholder="flags"
                      className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    フラグ説明
                  </label>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">g</code> - グローバル検索</div>
                    <div><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">i</code> - 大文字小文字を無視</div>
                    <div><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">m</code> - 複数行モード</div>
                    <div><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">s</code> - . が改行文字にもマッチ</div>
                  </div>
                </div>
              </div>
            </div>

            {/* テスト文字列入力 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">テスト文字列</h2>
              <textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="テストしたい文字列を入力してください"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* 結果表示 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                マッチ結果 ({matches.length} 件)
              </h2>
              
              {testString && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">ハイライト表示</h3>
                  <div 
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md border font-mono text-sm whitespace-pre-wrap break-all"
                    dangerouslySetInnerHTML={{ __html: highlightedText }}
                  />
                </div>
              )}

              {matches.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">詳細</h3>
                  <div className="space-y-3">
                    {matches.map((match, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md border">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">マッチ {index + 1}:</span>
                            <div className="font-mono text-blue-600 dark:text-blue-400 break-all">{match.match}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">位置:</span>
                            <div className="text-gray-600 dark:text-gray-400">{match.index} - {match.index + match.match.length - 1}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">長さ:</span>
                            <div className="text-gray-600 dark:text-gray-400">{match.match.length} 文字</div>
                          </div>
                        </div>
                        {match.groups.length > 0 && (
                          <div className="mt-3">
                            <span className="font-medium text-gray-700 dark:text-gray-300">キャプチャグループ:</span>
                            <div className="mt-1 space-y-1">
                              {match.groups.map((group, groupIndex) => (
                                <div key={groupIndex} className="text-sm">
                                  <span className="text-gray-600 dark:text-gray-400">グループ {groupIndex + 1}:</span>
                                  <span className="font-mono ml-2 text-green-600 dark:text-green-400">{group || '(null)'}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {regex && testString && matches.length === 0 && !error && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  マッチする文字列が見つかりませんでした
                </div>
              )}
            </div>
            <CommonPatterns />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
