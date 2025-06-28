'use client';

import React, { useState, useRef } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";


const RegexGroupingReference = () => {
  const [testInput, setTestInput] = useState('');
  const [selectedPattern, setSelectedPattern] = useState('');
  const [matchResult, setMatchResult] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const testRegex = (pattern, input) => {
    try {
      const regex = new RegExp(pattern, 'g');
      const matches = [...input.matchAll(regex)];
      setMatchResult({
        matches,
        exec: matches.length > 0 ? matches[0] : null,
        error: null,
      });
    } catch (error) {
      setMatchResult({ error: error.message, matches: [] });
    }
    // stateの更新がDOMに反映された後にページトップへスクロールを実行
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleTest = () => {
    if (selectedPattern && testInput) {
      testRegex(selectedPattern, testInput);
    }
  };

  const copyToClipboard = (text) => {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    } catch (err) {
        console.error('クリップボードへのコピーに失敗しました', err);
    }
  };


  const groupingMethods = [
    {
      title: "キャプチャグループ",
      syntax: "(pattern)",
      description: "一致したテキストを後で使用するために記憶するキャプチャグループを作成します。",
      jsExample: `const regex = /(\\d{4})-(\\d{2})-(\\d{2})/;
        const match = "2024-12-25".match(regex);
        console.log(match[1]); // "2024"
        console.log(match[2]); // "12"
        console.log(match[3]); // "25"`,
      examples: [
        {
          pattern: "(\\d{4})-(\\d{2})-(\\d{2})",
          input: "Date: 2024-12-25",
          description: "年、月、日を個別にキャプチャします"
        },
        {
          pattern: "([a-zA-Z]+)@([a-zA-Z0-9.-]+)",
          input: "Contact: john@example.com",
          description: "メールのユーザー名とドメイン部分をキャプチャします"
        }
      ],
      properties: [
        "1から始まる番号付きキャプチャグループを作成します",
        "マッチ結果の配列のインデックスを介してアクセスできます",
        "$1、$2などを使用して置換文字列で参照できます"
      ]
    },
    {
      title: "非キャプチャグループ",
      syntax: "(?:pattern)",
      description: "キャプチャグループを作成せずに式をグループ化します。",
      jsExample: `const regex = /(?:https?|ftp):\\/\\/([\\w.-]+)/;
        const match = "https://example.com".match(regex);
        console.log(match[1]); // "example.com"
        // プロトコルはキャプチャされません`,
      examples: [
        {
          pattern: "(?:Mr|Ms|Dr)\\. ([A-Z][a-z]+)",
          input: "Dr. Smith and Ms. Johnson",
          description: "敬称の選択肢をキャプチャせずにグループ化します"
        },
        {
          pattern: "(?:cat|dog)s?",
          input: "I have cats and dogs",
          description: "基本単語をキャプチャせずに単数形または複数形に一致させます"
        }
      ],
      properties: [
        "番号付きキャプチャグループを作成しません",
        "キャプチャグループよりもメモリ効率が良いです",
        "選択(|)を使ったグループ化に便利です"
      ]
    },
    {
      title: "肯定先読み",
      syntax: "(?=pattern)",
      description: "メインの式の後にあるグループに一致しますが、結果には含めません。",
      jsExample: `const regex = /\\w+(?=@)/g;
        const matches = "user@domain.com".match(regex);
        console.log(matches); // ["user"]`,
      examples: [
        {
          pattern: "\\d+(?=円)",
          input: "100円と200ドル",
          description: "「円」が続く数字に一致します"
        },
        {
          pattern: "\\w+(?=\\s+is)",
          input: "JavaScript is awesome",
          description: "「 is」が続く単語に一致します"
        }
      ],
      properties: [
        "ゼロ幅のアサーションです",
        "文字を消費しません",
        "条件付きのマッチングに便利です"
      ]
    },
    {
      title: "否定先読み",
      syntax: "(?!pattern)",
      description: "特定のパターンの後に続かないグループに一致します。",
      jsExample: `const regex = /Java(?!Script)/g;
        const text = "Java and JavaScript";
        const matches = text.match(regex);
        console.log(matches); // ["Java"]`,
      examples: [
        {
          pattern: "\\w+(?!@)",
          input: "user@domain.com",
          description: "@が続かない単語に一致します"
        },
        {
          pattern: "\\d+(?!px)",
          input: "10px 20em 15pt",
          description: "「px」が続かない数字に一致します"
        }
      ],
      properties: [
        "ゼロ幅のアサーションです",
        "不要な接尾辞を持つマッチを除外します",
        "フィルタリングによく使用されます"
      ]
    },
    {
      title: "肯定後読み",
      syntax: "(?<=pattern)",
      description: "特定のパターンの前にあるグループに一致します。",
      jsExample: `const regex = /(?<=\\$)\\d+/g;
        const matches = "$100 and 200yen".match(regex);
        console.log(matches); // ["100"]`,
      examples: [
        {
          pattern: "(?<=@)\\w+",
          input: "user@domain.com",
          description: "@の後のドメイン部分に一致します"
        },
        {
          pattern: "(?<=#)\\w+",
          input: "Visit #javascript and #react",
          description: "ハッシュタグの内容に一致します"
        }
      ],
      properties: [
        "ゼロ幅のアサーションです",
        "ES2018+の機能です",
        "すべてのブラウザでサポートされているわけではありません"
      ]
    },
    {
      title: "否定後読み",
      syntax: "(?<!pattern)",
      description: "特定のパターンの前にないグループに一致します。",
      jsExample: `const regex = /(?<!un)happy/g;
        const matches = "happy unhappy".match(regex);
        console.log(matches); // ["happy"]`,
      examples: [
        {
          pattern: "(?<!@)\\w+",
          input: "user@domain.com",
          description: "@が前にない単語に一致します"
        },
        {
          pattern: "(?<!\\d)\\d{3}",
          input: "123 and 4567",
          description: "より長い数字の一部ではない3桁の数字に一致します"
        }
      ],
      properties: [
        "ゼロ幅のアサーションです",
        "ES2018+の機能です",
        "文脈に応じたマッチングに便利です"
      ]
    },
    {
      title: "名前付きキャプチャグループ",
      syntax: "(?<name>pattern)",
      description: "参照しやすくするためにカスタム名を持つキャプチャグループを作成します。",
      jsExample: `const regex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
        const match = "2024-12-25".match(regex);
        console.log(match.groups.year);  // "2024"
        console.log(match.groups.month); // "12"
        console.log(match.groups.day);   // "25"`,
      examples: [
        {
          pattern: "(?<protocol>https?)://(?<domain>[\\w.-]+)",
          input: "https://example.com",
          description: "URLコンポーネントのための名前付きグループ"
        },
        {
          pattern: "(?<hour>\\d{2}):(?<minute>\\d{2})",
          input: "14:30",
          description: "時間コンポーネントのための名前付きグループ"
        }
      ],
      properties: [
        "ES2018+の機能です",
        "match.groupsオブジェクトを介してアクセスできます",
        "番号付きグループよりも読みやすいです"
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
          <div className="max-w-4xl mx-auto px-6 py-8 text-gray-800 dark:text-gray-200">
            <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 scroll-mt-4" id="quick-test">
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
                              <div><strong>マッチ {index + 1}:</strong> "{match[0]}"</div>
                              {match.slice(1).map((group, groupIndex) => (
                                <div key={groupIndex} className="ml-4">
                                  グループ {groupIndex + 1}: "{group}"
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

            {/* Methods */}
            <div className="space-y-8">
              {groupingMethods.map((method, index) => (
                <section key={index} className="border-b border-gray-200 dark:border-gray-700 pb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {method.title}
                  </h2>
                  
                  {/* Syntax */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">構文</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded p-3 font-mono text-sm flex items-center justify-between">
                      <code>{method.syntax}</code>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">説明</h3>
                    <p className="text-gray-700 dark:text-gray-300">{method.description}</p>
                  </div>

                  {/* JavaScript Example */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JavaScriptの例</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded p-4">
                      <pre className="font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                        <code>{method.jsExample}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">使用例</h3>
                    <div className="space-y-3">
                      {method.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="border border-gray-200 dark:border-gray-700 rounded p-4">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-2">
                            <div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">パターン</div>
                              <div className="font-mono text-sm bg-gray-50 dark:bg-gray-900 p-2 rounded border dark:border-gray-700 flex items-center justify-between">
                                <span>{example.pattern}</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">入力</div>
                              <div className="font-mono text-sm bg-gray-50 dark:bg-gray-900 p-2 rounded border dark:border-gray-700 flex items-center justify-between">
                                <span>{example.input}</span>
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

                  {/* Properties */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">特性</h3>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {method.properties.map((property, propIndex) => (
                        <li key={propIndex} className="flex">
                          <span className="mr-2">•</span>
                          <span>{property}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              ))}
            </div>

            {/* Browser Support */}
            <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">ブラウザのサポート</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 pr-4">機能</th>
                      <th className="text-left py-2 pr-4">Chrome</th>
                      <th className="text-left py-2 pr-4">Firefox</th>
                      <th className="text-left py-2 pr-4">Safari</th>
                      <th className="text-left py-2">Edge</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-gray-300">
                    <tr className="border-b border-gray-100 dark:border-gray-700/50">
                      <td className="py-2 pr-4">キャプチャグループ</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2">✓ All</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700/50">
                      <td className="py-2 pr-4">非キャプチャグループ</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2">✓ All</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700/50">
                      <td className="py-2 pr-4">先読み</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2">✓ All</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700/50">
                      <td className="py-2 pr-4">後読み</td>
                      <td className="py-2 pr-4">✓ 62+</td>
                      <td className="py-2 pr-4">✓ 78+</td>
                      <td className="py-2 pr-4">✓ 16.4+</td>
                      <td className="py-2">✓ 79+</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">名前付きグループ</td>
                      <td className="py-2 pr-4">✓ 64+</td>
                      <td className="py-2 pr-4">✓ 78+</td>
                      <td className="py-2 pr-4">✓ 11.1+</td>
                      <td className="py-2">✓ 79+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default RegexGroupingReference;
