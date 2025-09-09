---
title: 使用 Docusaurus 和 GitHub Pages 搭建个人技术网站
date: 2025-09-09
authors: [jayden]
tags: [docusaurus, githubpages]
---


# 🚀 使用 Docusaurus 和 GitHub Pages 搭建个人技术网站

Docusaurus 是 Meta（原 Facebook）开源的静态站点生成器，特别适合构建技术文档和博客。GitHub Pages 则提供免费的静态网站托管服务。两者结合，是搭建个人技术网站的绝佳选择。

---

## 1. 准备工作

确保你的环境满足以下要求：

-   **Git**：用于版本控制和部署。请确保已安装 Git 并配置好 GitHub 的 SSH 密钥或 Personal Access Token。
-   **Node.js**：版本需在 **20 或以上**。你可以在终端中运行 `node -v` 来检查。
-   **npm 或 yarn**：Node.js 的包管理器，安装 Node.js 时会自动包含 npm。

---

## 2. 安装和初始化 Docusaurus

通过以下命令创建新的 Docusaurus 项目：

```bash
npx create-docusaurus@latest my-technical-website classic
```

这里的 `my-technical-website` 是你的项目名称，可以自定义。`classic` 是 Docusaurus 的经典模板，它预设了文档和博客功能。

初始化完成后，进入项目目录并启动开发服务器：

```bash
cd my-technical-website
npm run start
```

浏览器会自动打开 `http://localhost:3000`，你就能看到网站的预览效果了。下面是一个典型的 Docusaurus 项目结构：

| 文件/目录              | 说明                                                               |
| ---------------------- | ------------------------------------------------------------------ |
| `/blog`                | 存放博客文章的 Markdown 文件。如果不需要博客功能，可以删除此目录。 |
| `/docs`                | 存放文档的 Markdown 文件。其顺序由 `sidebars.js` 定义。            |
| `/src`                 | 存放如页面或自定义 React 组件一类的非文档文件。                    |
| `/src/pages`           | 此目录中的 JSX/TSX/MDX 文件会被转换为网站页面。                    |
| `/static`              | 存放静态资源（如图片、`favicon`）的目录。                          |
| `docusaurus.config.js` | 站点的主要配置文件，非常重要。                                     |
| `package.json`         | 项目的包管理文件。                                                 |
| `sidebars.js`          | 用于定义文档侧边栏的顺序。                                         |


---


## 3. 进行基本配置

修改项目根目录下的 `docusaurus.config.js` 文件来配置你的网站。以下是需要重点关注的一些配置项：

```javascript
// docusaurus.config.js
module.exports = {
  title: '你的网站标题', // 例如：'我的技术博客'
  tagline: '一句吸引人的标语', // 显示在首页的标语
  url: 'https://yourusername.github.io', // 你的 GitHub Pages URL
  baseUrl: '/', // 如果发布到非根路径（如 /project/），则需要修改
  favicon: 'img/favicon.ico',
  organizationName: 'yourusername', // 你的 GitHub 用户名
  projectName: 'yourusername.github.io', // 通常是你的 GitHub 用户名或仓库名
  deploymentBranch: 'gh-pages', // 部署分支，通常为 gh-pages

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // editUrl: 'https://github.com/yourusername/repo/edit/main/', // 可选：“编辑此页”链接
        },
        blog: {
          showReadingTime: true, // 显示阅读时间估计
          // editUrl: 'https://github.com/yourusername/repo/edit/main/', // 可选：“编辑此页”链接
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: '网站标题',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/docs/intro', label: '文档', position: 'left'}, // 指向你的文档
        {to: '/blog', label: '博客', position: 'left'}, // 指向你的博客
        {
          href: 'https://github.com/yourusername/your-repo',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    // ... 其他主题配置，如页脚等 ...
  },
};
```

---

## 4. 编写内容

-   **博客文章**：保存在 `/blog` 目录，使用 Markdown 格式。文件命名通常包含日期，如 `2023-10-26-my-first-blog.md`。
-   **文档**：保存在 `/docs` 目录，同样使用 Markdown。你需要在 `sidebars.js` 中配置文档在侧边栏中的顺序。

---

## 5. 部署到 GitHub Pages

部署前，请再次确认 `docusaurus.config.js` 中的 `url`, `baseUrl`, `organizationName`, `projectName` 配置正确。

### 使用 GitHub Actions 自动部署

你可以配置 GitHub Actions，实现每次将代码推送到主分支（如 `main`）时自动构建和部署。

1.  **创建 Workflow 文件**：在你的项目根目录下创建 `.github/workflows/deploy.yml` 文件。
2.  **编写 Workflow 配置**：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

jobs:
  deploy:
    permissions:
      contents: read
      pages: write
      id-token: write
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        persist-credentials: true
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '22'
        
    - name: Install dependencies
      run: yarn install --frozen-lockfile
    
    - name: Clean build cache
      run: yarn clear
    
    - name: Build site
      run: yarn build

    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: './build'

    - name: Deploy to GitHub Pages
      uses: actions/deploy-pages@v4
```

3.  **推送代码**：将代码推送到 GitHub 的 `gh-pages` 分支，Action 会自动运行。
4.  **启用 Pages**：在 GitHub 仓库的 **Settings > Pages** 中，选择 **Source** 为 **GitHub Actions** 或部署分支为 `gh-pages`。

---

## 6. 访问网站

部署成功后，你的网站通常可以通过 `https://<你的 GitHub 用户名>.github.io`（如果仓库名为 `用户名.github.io`）或 `https://<你的 GitHub 用户名>.github.io/<仓库名>`（如果仓库名为其他）访问。

---

## ✨ 进阶配置和优化

-   **自定义域名**：如果你想使用自己的域名，只需在仓库的 Pages 设置中填写自定义域名，并在网站的 `static` 文件夹下创建一个 `CNAME` 文件（内容为你的域名）即可。
-   **评论系统**：Docusaurus 支持集成第三方评论系统（如 Giscus、Utterances），为你的博客增添互动性。
-   **搜索引擎优化（SEO）**：Docusaurus 内置了良好的 SEO 基础，你还可以在页面和配置中进一步优化元标签。

---

## 🤔 常见问题（FAQ）

1.  **部署命令报错 `Running git push command failed`**：  
    检查 `docusaurus.config.js` 中的 `organizationName`（应为 GitHub 用户名）和 `projectName`（应为仓库名）是否配置正确。

2.  **OpenSSL 相关错误或超时**：  
    这通常是网络问题。尝试切换网络，或检查 Git 的代理设置。有时关闭 VPN 可以解决。

3.  **内存不足错误（FATAL ERROR: Zone Allocation failed）**：  
    尝试关闭一些其他应用以释放内存，或者在更好的网络环境下操作。也有案例表明关闭 VPN 后此问题得到解决。

4.  **GitHub Actions 部署失败**：  
    检查 Workflow 文件中指定的分支名称和构建目录是否正确。确保 `secrets.GITHUB_TOKEN` 具有足够的权限（通常由 GitHub 自动提供）。

5.  **页面显示 404 或样式错乱**：  
    绝大多数情况是 `docusaurus.config.js` 中的 `url` 和 `baseUrl` 配置错误。请仔细检查并根据你的仓库结构进行修改。

---

## 💎 总结

使用 Docusaurus 和 GitHub Pages 搭建技术博客，**能让你专注于内容创作而非繁琐的运维**。Docusaurus 的现代化设计、对 Markdown 和 React 的良好支持，以及 GitHub Pages 的免费和便捷，使其成为技术人士展示自我的强大工具。

希望这份指南能助你顺利开启技术写作之旅！如果你在搭建过程中遇到其他问题，Docusaurus 官方文档和活跃的社区是寻找答案的好去处。