/*
 * @Author: wuzhaoyi
 * @Email: wuzhaoyi@njsdata.com
 * @LastEditors: wuzhaoyi
 * @Date: 2020-11-08 21:37:16
 * @LastEditTime: 2020-11-08 21:37:31
 * @Description: 请描述文件作用
 */
module.exports = {
  disableEmoji: false,
  list: [
    'test',
    'feat',
    'fix',
    'chore',
    'docs',
    'refactor',
    'style',
    'ci',
    'perf',
    'build',
    'revert',
  ],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
  scopes: [],
  types: {
    chore: {
      description: '不修改 src 或者 test 的其余修改，例如构建过程或辅助工具的变动',
      emoji: '🤖',
      value: 'chore',
    },
    ci: {
      description: 'CI相关变更',
      emoji: '🎡',
      value: 'ci',
    },
    docs: {
      description: '只改动了文档相关的内容',
      emoji: '✏️ ',
      value: 'docs',
    },
    feat: {
      description: '新增功能',
      emoji: '🎸',
      value: 'feat',
    },
    fix: {
      description: '修复BUG',
      emoji: '🐛',
      value: 'fix',
    },
    perf: {
      description: '更改代码以提高性能',
      emoji: '⚡️',
      value: 'perf',
    },
    refactor: {
      description: '既无法修复错误也未添加功能的代码更改',
      emoji: '💡',
      value: 'refactor',
    },
    release: {
      description: '创建一个发布提交',
      emoji: '🏹',
      value: 'release',
    },
    style: {
      description: '代码格式：标记，空格，格式，分号丢失...',
      emoji: '💄',
      value: 'style',
    },
    test: {
      description: '添加缺少的测试',
      emoji: '💍',
      value: 'test',
    },
    build: {
      description: '构造工具的或者外部依赖的改动，例如 webpack，npm',
      emoji: '🏗 ',
      value: 'build',
    },
    revert: {
      description: '执行 git revert 打印的 message',
      emoji: '💩',
      value: 'revert',
    },
  },
};
