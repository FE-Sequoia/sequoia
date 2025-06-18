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
      '/hobby/': sidebarBobby(),
      '/interview/': sidebarInterview(),
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
    { text: '前端面试', link: '/interview/stack-vue/', activeMatch: '/interview/' },
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

// 面试
function sidebarInterview() {
  return [
    {
      text: '技术栈',
      collapsed: false,
      base: '/interview/stack-',
      items: [
        { text: 'HTML/CSS', link: 'html-css' },
        { text: 'JavaScript', link: 'javascript' },
        { text: '浏览器', link: 'browser' },
        { text: 'Vue2(3)', link: 'vue' },
        { text: 'React', link: 'react' },
      ]
    },
    {
      text: '工程化',
      collapsed: true,
      base: '/interview/engineering-',
      items: [
        { text: 'WebPack', link: 'webpack' },
      ]
    },
    {
      text: '网络与安全',
      collapsed: true,
      base: '/interview/net-',
      items: [
        { text: 'HTTP/TCP', link: 'http-tcp' }
      ]
    },
    {
      text: '算法和数据结构',
      collapsed: true,
      base: '/interview/algorithm-',
      items: [
        { text: '算法数据', link: 'leetcode' }
      ]
    },
    {
      text: '系统设计',
      collapsed: true,
      base: '/interview/design-',
      items: [
        { text: '前端架构', link: 'system' }
      ]
    },
    {
      text: '软实力',
      collapsed: true,
      base: '/interview/power-',
      items: [
        { text: '面试技巧', link: 'QA' }
      ]
    },
    {
      text: '简历',
      collapsed: true,
      base: '/interview/resume-',
      items: [
        { text: '开发岗', link: 'developer' },
        { text: '管理岗', link: 'manage' }
      ]
    }
  ]
}
