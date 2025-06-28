'use client';

import React, { useState } from 'react';
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
  };

  const handleTest = () => {
    if (selectedPattern && testInput) {
      testRegex(selectedPattern, testInput);
    }
  };

  const copyToClipboard = (text) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  };


  const groupingMethods = [
    {
      title: "Capturing Groups",
      syntax: "(pattern)",
      description: "Creates a capturing group that remembers the matched text for later use.",
      jsExample: `const regex = /(\d{4})-(\d{2})-(\d{2})/;
const match = "2024-12-25".match(regex);
console.log(match[1]); // "2024"
console.log(match[2]); // "12"
console.log(match[3]); // "25"`,
      examples: [
        {
          pattern: "(\\d{4})-(\\d{2})-(\\d{2})",
          input: "Date: 2024-12-25",
          description: "Captures year, month, and day separately"
        },
        {
          pattern: "([a-zA-Z]+)@([a-zA-Z0-9.-]+)",
          input: "Contact: john@example.com",
          description: "Captures username and domain parts of email"
        }
      ],
      properties: [
        "Creates numbered capture groups starting from 1",
        "Accessible via match result array indices",
        "Can be referenced in replacement strings with $1, $2, etc."
      ]
    },
    {
      title: "Non-Capturing Groups",
      syntax: "(?:pattern)",
      description: "Groups expressions without creating a capture group.",
      jsExample: `const regex = /(?:https?|ftp):\/\/([\\w.-]+)/;
const match = "https://example.com".match(regex);
console.log(match[1]); // "example.com"
// Protocol is not captured`,
      examples: [
        {
          pattern: "(?:Mr|Ms|Dr)\\. ([A-Z][a-z]+)",
          input: "Dr. Smith and Ms. Johnson",
          description: "Groups title options without capturing them"
        },
        {
          pattern: "(?:cat|dog)s?",
          input: "I have cats and dogs",
          description: "Matches singular or plural without capturing base word"
        }
      ],
      properties: [
        "Does not create numbered capture groups",
        "More memory efficient than capturing groups",
        "Useful for grouping with alternation (|)"
      ]
    },
    {
      title: "Positive Lookahead",
      syntax: "(?=pattern)",
      description: "Matches a group after the main expression without including it in the result.",
      jsExample: `const regex = /\\w+(?=@)/g;
const matches = "user@domain.com".match(regex);
console.log(matches); // ["user"]`,
      examples: [
        {
          pattern: "\\d+(?=円)",
          input: "100円と200ドル",
          description: "Matches numbers followed by 円"
        },
        {
          pattern: "\\w+(?=\\s+is)",
          input: "JavaScript is awesome",
          description: "Matches words followed by ' is'"
        }
      ],
      properties: [
        "Zero-width assertion",
        "Does not consume characters",
        "Useful for conditional matching"
      ]
    },
    {
      title: "Negative Lookahead",
      syntax: "(?!pattern)",
      description: "Matches a group that is not followed by a specific pattern.",
      jsExample: `const regex = /Java(?!Script)/g;
const text = "Java and JavaScript";
const matches = text.match(regex);
console.log(matches); // ["Java"]`,
      examples: [
        {
          pattern: "\\w+(?!@)",
          input: "user@domain.com",
          description: "Matches words not followed by @"
        },
        {
          pattern: "\\d+(?!px)",
          input: "10px 20em 15pt",
          description: "Matches numbers not followed by px"
        }
      ],
      properties: [
        "Zero-width assertion",
        "Excludes matches with unwanted suffixes",
        "Commonly used for filtering"
      ]
    },
    {
      title: "Positive Lookbehind",
      syntax: "(?<=pattern)",
      description: "Matches a group that is preceded by a specific pattern.",
      jsExample: `const regex = /(?<=\\$)\\d+/g;
const matches = "$100 and 200yen".match(regex);
console.log(matches); // ["100"]`,
      examples: [
        {
          pattern: "(?<=@)\\w+",
          input: "user@domain.com",
          description: "Matches domain part after @"
        },
        {
          pattern: "(?<=#)\\w+",
          input: "Visit #javascript and #react",
          description: "Matches hashtag content"
        }
      ],
      properties: [
        "Zero-width assertion",
        "ES2018+ feature",
        "Not supported in all browsers"
      ]
    },
    {
      title: "Negative Lookbehind",
      syntax: "(?<!pattern)",
      description: "Matches a group that is not preceded by a specific pattern.",
      jsExample: `const regex = /(?<!un)happy/g;
const matches = "happy unhappy".match(regex);
console.log(matches); // ["happy"]`,
      examples: [
        {
          pattern: "(?<!@)\\w+",
          input: "user@domain.com",
          description: "Matches words not preceded by @"
        },
        {
          pattern: "(?<!\\d)\\d{3}",
          input: "123 and 4567",
          description: "Matches 3-digit numbers not part of longer numbers"
        }
      ],
      properties: [
        "Zero-width assertion",
        "ES2018+ feature",
        "Useful for context-sensitive matching"
      ]
    },
    {
      title: "Named Capturing Groups",
      syntax: "(?<name>pattern)",
      description: "Creates a capturing group with a custom name for easier reference.",
      jsExample: `const regex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const match = "2024-12-25".match(regex);
console.log(match.groups.year);  // "2024"
console.log(match.groups.month); // "12"
console.log(match.groups.day);   // "25"`,
      examples: [
        {
          pattern: "(?<protocol>https?)://(?<domain>[\\w.-]+)",
          input: "https://example.com",
          description: "Named groups for URL components"
        },
        {
          pattern: "(?<hour>\\d{2}):(?<minute>\\d{2})",
          input: "14:30",
          description: "Named groups for time components"
        }
      ],
      properties: [
        "ES2018+ feature",
        "Accessible via match.groups object",
        "More readable than numbered groups"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 bg-white overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <section className="border border-gray-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Test</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pattern
                    </label>
                    <input
                      type="text"
                      value={selectedPattern}
                      onChange={(e) => setSelectedPattern(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded font-mono text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      placeholder="Enter regex pattern"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Test String
                    </label>
                    <input
                      type="text"
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded font-mono text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      placeholder="Enter test string"
                    />
                  </div>
                </div>
                <button
                  onClick={handleTest}
                  className="px-4 py-2 bg-gray-900 text-white rounded text-sm hover:bg-gray-800 transition-colors"
                >
                  Test
                </button>
                
                {matchResult && (
                  <div className="mt-4 p-4 bg-gray-50 rounded border">
                    <h3 className="font-medium text-gray-900 mb-2">Result:</h3>
                    {matchResult.error ? (
                      <div className="text-red-600 font-mono text-sm">{matchResult.error}</div>
                    ) : matchResult.matches && matchResult.matches.length > 0 ? (
                      <div className="space-y-2">
                        {matchResult.matches.map((match, index) => (
                          <div key={index} className="font-mono text-sm">
                            <div><strong>Match {index + 1}:</strong> "{match[0]}"</div>
                            {match.slice(1).map((group, groupIndex) => (
                              <div key={groupIndex} className="ml-4">
                                Group {groupIndex + 1}: "{group}"
                              </div>
                            ))}
                            {match.groups && (
                              <div className="ml-4">
                                Named groups: {JSON.stringify(match.groups)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500 font-mono text-sm">No matches</div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Methods */}
            <div className="space-y-8">
              {groupingMethods.map((method, index) => (
                <section key={index} className="border-b border-gray-200 pb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    {method.title}
                  </h2>
                  
                  {/* Syntax */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Syntax</h3>
                    <div className="bg-gray-50 border rounded p-3 font-mono text-sm flex items-center justify-between">
                      <code>{method.syntax}</code>
                      <button
                        onClick={() => copyToClipboard(method.syntax)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                    <p className="text-gray-700">{method.description}</p>
                  </div>

                  {/* JavaScript Example */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">JavaScript Example</h3>
                    <div className="bg-gray-50 border rounded p-4">
                      <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">
                        <code>{method.jsExample}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Examples</h3>
                    <div className="space-y-3">
                      {method.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="border border-gray-200 rounded p-4">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-2">
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Pattern</div>
                              <div className="font-mono text-sm bg-gray-50 p-2 rounded border flex items-center justify-between">
                                <span>{example.pattern}</span>
                                <button
                                  onClick={() => setSelectedPattern(example.pattern)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                </button>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Input</div>
                              <div className="font-mono text-sm bg-gray-50 p-2 rounded border flex items-center justify-between">
                                <span>{example.input}</span>
                                <button
                                  onClick={() => setTestInput(example.input)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                </button>
                              </div>
                            </div>
                            <div className="flex items-end">
                              <button
                                onClick={() => {
                                  setSelectedPattern(example.pattern);
                                  setTestInput(example.input);
                                  testRegex(example.pattern, example.input);
                                }}
                                className="px-3 py-2 bg-gray-900 text-white rounded text-sm hover:bg-gray-800 transition-colors flex items-center"
                              >
                                Test
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{example.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Properties */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Properties</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
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
            <section className="border border-gray-200 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Browser Support</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 pr-4">Feature</th>
                      <th className="text-left py-2 pr-4">Chrome</th>
                      <th className="text-left py-2 pr-4">Firefox</th>
                      <th className="text-left py-2 pr-4">Safari</th>
                      <th className="text-left py-2">Edge</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">Capturing Groups</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2">✓ All</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">Non-capturing Groups</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2">✓ All</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">Lookahead</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2 pr-4">✓ All</td>
                      <td className="py-2">✓ All</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">Lookbehind</td>
                      <td className="py-2 pr-4">✓ 62+</td>
                      <td className="py-2 pr-4">✓ 78+</td>
                      <td className="py-2 pr-4">✓ 16.4+</td>
                      <td className="py-2">✓ 79+</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Named Groups</td>
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
