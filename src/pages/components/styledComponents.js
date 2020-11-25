/*
 * @Author: wuzhaoyi
 * @Email: wuzhaoyi@njsdata.com
 * @LastEditors: wuzhaoyi
 * @Date: 2020-11-15 15:56:50
 * @LastEditTime: 2020-11-22 18:07:34
 * @Description: 请描述文件作用
 */
import styled from 'styled-components';
import { animated } from 'react-spring';

const PianoContainer = styled(animated.div).attrs({
  className: 'flex',
})`
  width: 80vw;
  height: 60vh;
  margin: auto;
  margin-top: 100px;
`;

const PianoOctaveStyled = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  height: 100%;
  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

const PianoKeys = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  transition: all 0.1s ease-in-out;
  &:not(:first-of-type) {
    margin-left: -1px;
  }
`;
const WhiteKey = styled(animated.div)`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 5px 3px 0 rgba(170, 170, 170, 1);
`;
const BlackKeyContainer = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
`;

const BlackKey = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 2;
  width: 50%;
  height: 80%;
  margin-left: 25%;
  background: #000;
  background: linear-gradient(#151b19, #222 75%, #000);
  border-color: #000;
  border-style: solid;
  border-width: 0 6px 12px;
  border-bottom-color: #222;
  border-radius: 0 0 2px 2px;
  box-shadow: 0 5px 2px 2px #111, inset 0 0 0 1px rgb(0 0 0);
  transition: all 0.1s ease-in-out;
`;

export { PianoContainer, PianoOctaveStyled, PianoKeys, WhiteKey, BlackKeyContainer, BlackKey };
