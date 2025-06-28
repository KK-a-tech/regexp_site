'use client';

import React, { useState } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";

interface MatchResult {
  matches: RegExpMatchArray[];
  exec: RegExpMatchArray | null;
  error: string | null;
}

export default function RegexEscapeReference() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [testInput, setTestInput] = useState('');
  const [selectedPattern, setSelectedPattern] = useState('');
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);

  const testRegex = (pattern: string, input: string) => {
    try {
      const regex = new RegExp(pattern, 'g');
      const matches = [...input.matchAll(regex)];
      setMatchResult({
        matches,
        exec: matches.length > 0 ? matches[0] : null,
        error: null,
      });
    } catch (error) {
      setMatchResult({ error: (error as Error).message, matches: [], exec: null });
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleTest = () => {
    if (selectedPattern && testInput) {
      testRegex(selectedPattern, testInput);
    }
  };

  const escapeSequences = [
    {
      title: "ドット (.)",
      syntax: "\\.",
      description: "通常、ドットは任意の1文字にマッチしますが、エスケープすることで「.」そのものにマッチさせます。",
      jsExample: `const regex = /\\./g;
const text = "file.txt";
console.log(text.match(regex)); // ["."]
`,
      examples: [
        {
          pattern: "\\.",
          input: "file.txt",
          description: "拡張子のドットに一致"
        }
      ],
      properties: [
        "エスケープにより特殊文字を文字通り扱えます",
        "文字列内で明確に「.」を検索したいときに必要です"
      ]
    },
    {
      title: "円記号 (\\)",
      syntax: "\\\\",
      description: "円記号そのものにマッチします。JS内で二重にエスケープが必要です。",
      jsExample: `const regex = /\\\\/g;
const text = "C:\\\\Program Files\\\\";
console.log(text.match(regex)); // ["\\", "\\"]
`,
      examples: [
        {
          pattern: "\\\\",
          input: "C:\\Program Files\\",
          description: "Windowsパスのバックスラッシュに一致"
        }
      ],
      properties: [
        "JavaScriptの文字列内では二重にエスケープ（\\\\）が必要",
        "正規表現文字列とJS文字列の両方で注意が必要"
      ]
    },
    {
      title: "タブ",
      syntax: "\\t",
      description: "タブ文字に一致します。",
      jsExample: `const regex = /\\t/;
const text = "A\\tB";
console.log(regex.test(text)); // true
`,
      examples: [
        {
          pattern: "\\t",
          input: "A\tB",
          description: "タブ文字に一致"
        }
      ],
      properties: [
        "空白の種類を区別できる",
        "見えない文字の検出に便利"
      ]
    },
    {
      title: "改行",
      syntax: "\\n",
      description: "改行文字に一致します。",
      jsExample: `const regex = /\\n/;
const text = "Line1\\nLine2";
console.log(regex.test(text)); // true
`,
      examples: [
        {
          pattern: "\\n",
          input: "Hello\nWorld",
          description: "改行部分に一致"
        }
      ],
      properties: [
        "複数行文字列の解析に使います",
        "Windows環境では \\r\\n との使い分けに注意"
      ]
    }
  ];

  const TestIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
      <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">エスケープシーケンス</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">特殊文字を正確にマッチさせるテクニック</p>
          </div>
          <div className="max-w-4xl mx-auto px-6 py-8 text-gray-800 dark:text-gray-200">
            {/* Quick Test Section */}
            <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8" id="quick-test">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">クイックテスト</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      パターン
                    </label>
                    <input
                      type="text"
                      value={selectedPattern}
                      onChange={(e) => setSelectedPattern(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded font-mono text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 bg-white dark:bg-gray-700"
                      placeholder="正規表現パターンを入力"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      テスト文字列
                    </label>
                    <input
                      type="text"
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded font-mono text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 bg-white dark:bg-gray-700"
                      placeholder="テストする文字列を入力"
                    />
                  </div>
                </div>
                <button
                  onClick={handleTest}
                  className="px-4 py-2 bg-gray-900 text-white rounded text-sm hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
                >
                  テスト
                </button>
                
                <div>
                  {matchResult && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded border dark:border-gray-700">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">結果:</h3>
                      {matchResult.error ? (
                        <div className="text-red-600 font-mono text-sm">{matchResult.error}</div>
                      ) : matchResult.matches && matchResult.matches.length > 0 ? (
                        <div className="space-y-2">
                          {matchResult.matches.map((match, index) => (
                            <div key={index} className="font-mono text-sm text-gray-700 dark:text-gray-300">
                              <div><strong>マッチ {index + 1}:</strong> &quot;{match[0]}&quot;</div>
                              {match.slice(1).map((group, groupIndex) => (
                                <div key={groupIndex} className="ml-4">
                                  グループ {groupIndex + 1}: &quot;{group}&quot;
                                </div>
                              ))}
                              {match.groups && Object.keys(match.groups).length > 0 && (
                                <div className="ml-4">
                                  名前付きグループ: {JSON.stringify(match.groups)}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-gray-500 font-mono text-sm">一致しませんでした</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Escape Sequences Sections */}
            {escapeSequences.map((seq, index) => (
              <section key={index} className="border-b border-gray-200 dark:border-gray-700 pb-8 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  {seq.title}
                </h2>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">構文</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded p-3 font-mono text-sm">
                    <code>{seq.syntax}</code>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">説明</h3>
                  <p className="text-gray-700 dark:text-gray-300">{seq.description}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JavaScriptの例</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded p-4">
                    <pre className="font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      <code>{seq.jsExample}</code>
                    </pre>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">使用例</h3>
                  <div className="space-y-3">
                    {seq.examples.map((example, exIdx) => (
                      <div key={exIdx} className="border border-gray-200 dark:border-gray-700 rounded p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">パターン</div>
                            <div className="font-mono text-sm bg-gray-50 dark:bg-gray-900 p-2 rounded border dark:border-gray-700">
                              {example.pattern}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">入力</div>
                            <div className="font-mono text-sm bg-gray-50 dark:bg-gray-900 p-2 rounded border dark:border-gray-700 overflow-x-auto">
                              {example.input}
                            </div>
                          </div>
                          <div className="flex items-end">
                            <button
                              onClick={() => {
                                setSelectedPattern(example.pattern);
                                setTestInput(example.input);
                                testRegex(example.pattern, example.input);
                              }}
                              className="px-3 py-2 bg-gray-900 text-white rounded text-sm hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors flex items-center w-full justify-center"
                            >
                              <TestIcon />
                              テスト
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{example.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">特性</h3>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {seq.properties.map((prop, propIdx) => (
                      <li key={propIdx} className="flex">
                        <span className="mr-2">•</span>
                        <span>{prop}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
