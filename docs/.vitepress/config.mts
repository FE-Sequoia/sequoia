import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "红杉的网络日志",
  description: "慢就是快，积微者成。",
  head: [['link', { rel: 'icon', href: '/bishe-workshop/favicon.ico' }]],
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
      tipLabel: 'Tips',
      warningLabel: '注意',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  },
  themeConfig: {
    logo: "/logo.png",
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
      text: '杂记',
      collapsed: false,
      base: '/jobs/notes-',
      items: [
        { text: '减肥挑战', link: 'lose-weight' },
        { text: '为什么放假比上班还焦虑', link: 'holiday' },
        { text: '大龄程序员的失业焦虑', link: 'jobs' },
        { text: '走向死亡的完美主义者', link: 'perfectionist' },
        { text: '你的工作不是你的工作', link: 'lifeos' },
        { text: '乌贼与龙虾', link: 'origin' },
        {
          text: '历史里的故事',
          base: '/jobs/history-',
          items: [
            { text: '恩德培行动', link: 'entebbe' }
          ]
        }
      ]
    },
    {
      text: '文摘',
      collapsed: false,
      items: [
        { text: '苏联笑话集锦', link: '/jobs/jokes' },
        { text: '2025文章集锦', link: '/jobs/summary' }
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
