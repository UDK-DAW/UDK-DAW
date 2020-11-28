/*
 * @Author: wuzhaoyi
 * @Email: wuzhaoyi@njsdata.com
 * @LastEditors: wuzhaoyi
 * @Date: 2020-11-21 22:39:33
 * @LastEditTime: 2020-11-28 15:15:56
 * @Description: 请描述文件作用
 */
export interface KeySpringProps {
  top?: any;
  color?: any;
  boxShadow?: any;
  opacity?: any;
  height?: any;
}

export type Action = 'up' | 'down';
export type KeyType = 'white' | 'black';

export interface RefObject {
  handleKeyEvent: (arg1: number, arg2: Action, arg3: KeyType) => void;
}

export enum firstWhiteKeyEnum {
  a = 'C',
  s = 'D',
  d = 'E',
  f = 'F',
  g = 'G',
  h = 'A',
  j = 'B',
}
export enum secondWhiteKeyEnum {
  k = 'C',
  l = 'D',
  ';' = 'E',
  "'" = 'F',
}
export enum firstBlackKeyEnum {
  w = 'Db',
  e = 'Eb',
  t = 'Gb',
  y = 'Ab',
  u = 'Bb',
}
export enum secondBlackKeyEnum {
  i = 'Cb',
  o = 'Db',
  p = 'Eb',
  '[' = 'Fb',
  ']' = 'Gb',
  '\\' = 'Ab',
}
