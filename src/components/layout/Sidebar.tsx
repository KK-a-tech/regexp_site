"use client";

import { useState } from "react";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    {
      title: "基本構文",
      items: [
        { name: "文字クラス", id: "char-class" },
        { name: "アンカー", id: "anchors" },
        { name: "量詞", id: "quantifiers" },
        { name: "グループ化", id: "groups" },
      ],
    },
    {
      title: "パターン",
      items: [
        { name: "メタ文字", id: "meta" },
        { name: "エスケープ", id: "escape" },
        { name: "特殊シーケンス", id: "special-sequence" },
      ],
    },
    {
      title: "チートシート",
      items: [
        { name: "クイックリファレンス", id: "cheatsheet" },
        { name: "よく使うパターン", id: "common-patterns" },
      ],
    },
    {
      title: "テスター",
      items: [
        { name: "リアルタイム検証", id: "realtime" },
        { name: "マッチ結果表示", id: "match-result" },
      ],
    },
    {
      title: "実例集",
      items: [
        { name: "メール検証", id: "email" },
        { name: "URL抽出", id: "url" },
        { name: "電話番号", id: "phone" },
        { name: "日付形式", id: "date" },
      ],
    },
  ];

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    navigationItems.reduce((acc, section) => {
      if (section.title === "実例集" || section.title === "テスター") {
        acc[section.title] = false; // 閉じる
      } else {
        acc[section.title] = true;  // 開く
      }
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div>
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full pt-16 lg:pt-0">
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 py-6 space-y-2">
              <ul className="space-y-1">
                {navigationItems.map((section) => (
                  <li key={section.title}>
                    <button
                      type="button"
                      onClick={() => toggleSection(section.title)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none"
                    >
                      {section.title}
                      <span>{openSections[section.title] ? "▲" : "▼"}</span>
                    </button>
                    {openSections[section.title] && (
                      <ul className="mt-1 space-y-1 pl-4">
                        {section.items.map((item) => (
                          <li key={item.id}>
                            <a
                              href={`/${item.id}`}
                              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 rounded-md hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
