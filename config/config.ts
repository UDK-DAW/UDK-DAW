/*
 * @Author: wuzhaoyi
 * @Email: wuzhaoyi@njsdata.com
 * @LastEditors: wuzhaoyi
 * @Date: 2020-11-11 22:44:02
 * @LastEditTime: 2020-11-12 10:12:06
 * @Description: 请描述文件作用
 */
import routes from './routes';

const tailwindcss = require('tailwindcss');

export default {
  base: '/docs/',
  publicPath: '/static/',
  hash: true,
  history: {
    type: 'hash',
  },
  routes,
  extraPostCSSPlugins: [tailwindcss],
  extraBabelPlugins: ['emotion', 'babel-plugin-react-require'],
};
