"use client";

import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: "Top", href: "/" },
    { name: "テスター", href: "/tester" },
    { name: "チートシート", href: "/cheatsheet" },
    { name: "プライバシーポリシー", href: "/privacy" },
    { name: "利用規約", href: "/terms" },
  ];

  const externalLinks = [
    { name: "GitHub", href: "https://github.com", icon: "github" },
    { name: "Twitter", href: "https://twitter.com", icon: "twitter" },
    { name: "お問い合わせ", href: "/contact", icon: "mail" },
  ];

  const getSvgIcon = (iconType: string) => {
    switch (iconType) {
      case "github":
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case "twitter":
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        );
      case "mail":
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ブランド情報 */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white mb-4 block">
              正規表現リファレンス
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              正規表現の学習とテストに役立つ総合リファレンスサイトです。初心者から上級者まで、誰でも使いやすいツールと詳細な解説を提供しています。
            </p>
          </div>

          {/* ナビゲーションリンク */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              ナビゲーション
            </h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 外部リンク */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              リンク
            </h3>
            <ul className="space-y-3">
              {externalLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center"
                    target={link.href.startsWith('http') ? "_blank" : undefined}
                    rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  >
                    {getSvgIcon(link.icon)}
                    <span className="ml-2">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <p className="text-gray-500 dark:text-gray-400 text-sm ">
            © {currentYear} 正規表現リファレンス. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
