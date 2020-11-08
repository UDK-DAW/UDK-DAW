/*
 * @Author: wuzhaoyi
 * @Email: wuzhaoyi@njsdata.com
 * @LastEditors: wuzhaoyi
 * @Date: 2020-08-17 13:44:18
 * @LastEditTime: 2020-11-08 23:23:11
 * @Description: 请描述文件作用
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/piano', component: '@/pages/Piano' },
  ],
  base: '/docs/',
  publicPath: '/static/',
  hash: true,
  history: {
    type: 'hash',
  },
});
