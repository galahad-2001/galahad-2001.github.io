// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '顾惠栋的测试空间',
  tagline: '知识库与博客',
  favicon: 'img/favicon.ico',

  // Future flags
  future: {
    v4: true,
  },

  url: 'https://galahad-2001.github.io/',
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'galahad-2001',
  projectName: 'galahad-2001.github.io',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // 更新为您的实际仓库地址
          editUrl:
            'https://github.com/galahad-2001/galahad-2001.github.io/tree/main/',
          // 添加文档最后更新时间
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // 更新为您的实际仓库地址
          editUrl:
            'https://github.com/galahad-2001/galahad-2001.github.io/tree/main/',
          // 博客相关优化配置
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          // 添加博客列表分页
          postsPerPage: 10,
          // 添加博客存档功能
          blogSidebarCount: 'ALL',
          blogSidebarTitle: '所有博文',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // 更新为您的实际社交卡片图片
      image: 'img/social-card.jpg',
      navbar: {
        title: '顾惠栋的测试空间',
        logo: {
          alt: '顾惠栋的Logo',
          src: 'img/logo.svg',
          // 添加Logo目标链接
          href: '/',
          target: '_self',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '知识库',
          },
          { to: '/blog', label: '博客', position: 'left' },
          // 添加搜索功能
          {
            type: 'search',
            position: 'right',
          },
          {
            href: 'https://github.com/galahad-2001',
            label: 'GitHub',
            position: 'right',
            // 添加图标
            className: 'header-github-link',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: '知识库',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/galahad-2001',
              },
              {
                label: '知乎',
                href: 'https://www.zhihu.com/people/galahad47',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '博客',
                to: '/blog',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Jayden Gu. 使用 Docusaurus 构建。`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;