import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "红杉的网络日志",
  description: "慢就是快，积微者成。",
  cleanUrls: true,
  base: "/sequoia/",
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    },
    container: {
      tipLabel: '内容详情',
      warningLabel: '注意',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  },
  themeConfig: {
    search: {
      provider: 'local'
    },
    
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),

    sidebar: {
      '/jobs/': sidebarJobs(),
      '/hobby/': sidebarBobby()
    },

    lastUpdatedText: '最后更新',

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: '红杉的网络日志·慢就是快·积微者成'
    }
  }
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: '首页', link: '/' },
    { text: '北漂杂记', link: '/jobs/', activeMatch: '/jobs/' },
    { text: '兴趣&爱好', link: '/hobby/video_editing/', activeMatch: '/hobby/' },
    { text: '关于', link: '/about-me' }
  ]
}

function sidebarJobs() {
  return [
    {
      text: '杂记见闻',
      collapsed: false,
      items: [
        { text: '苏阳：我相信人都是善良的', link: '/jobs/' }
      ]
    },
    {
      text: '言论文摘',
      collapsed: false,
      items: [
        { text: '2025·四月', link: '/jobs/summary' }
      ]
    }
  ]
}

function sidebarBobby() {
  return [
    {
      text: '视频剪辑',
      collapsed: false,
      items: [
        { text: '剪辑理论', link: '/hobby/video_editing/' }
      ]
    },
    {
      text: '故事写作',
      collapsed: false,
      items: [
        { text: '写作理论', link: '/hobby/novel_writing/' }
      ]
    }
  ]
}
