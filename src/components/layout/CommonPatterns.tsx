"use client";

import CodeBlock from "@/components/ui/CodeBlock";

const commonPatterns = [
  { name: 'メールアドレス', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
  { name: '電話番号', pattern: '\\d{2,4}-\\d{2,4}-\\d{4}' },
  { name: '郵便番号', pattern: '\\d{3}-\\d{4}' },
  { name: 'URL', pattern: 'https?://[\\w\\-._~:/?#\\[\\]@!$&\'()*+,;=%]+' },
  { name: '日付 (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
  { name: 'IPv4アドレス', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b' }
];

export default function CommonPatterns({ 
  onPatternSelect, 
  columns = 2, // デフォルトは2カラム
  className = "" 
}) {
  // カラム数に応じたCSSクラスを生成
  const getGridClasses = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2";
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">よく使われるパターン</h2>
      <div className={`grid ${getGridClasses()} gap-4`}>
        {commonPatterns.map((pattern, index) => (
          <button
            key={index}
            onClick={() => onPatternSelect(pattern.pattern)}
            className="text-left p-3 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="font-medium text-gray-900 dark:text-white">{pattern.name}</div>
            <CodeBlock>{pattern.pattern}</CodeBlock>
          </button>
        ))}
      </div>
    </div>
  );
};