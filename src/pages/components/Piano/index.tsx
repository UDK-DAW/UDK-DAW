import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import * as Tone from 'tone';
import { useSpring } from 'react-spring';
import { PianoContainer } from '../styledComponents';
import {
  KeySpringProps,
  Action,
  firstWhiteKeyEnum,
  secondWhiteKeyEnum,
  firstBlackKeyEnum,
  secondBlackKeyEnum,
  RefObject,
  KeyType,
} from '../types';

import PianoOctave from '../PianoOctave';

const keyboardInterval = [
  {
    white: firstWhiteKeyEnum,
    black: firstBlackKeyEnum,
  },
  {
    white: secondWhiteKeyEnum,
    black: secondBlackKeyEnum,
  },
];

const Piano = () => {
  const props: KeySpringProps = useSpring({ opacity: 1, from: { opacity: 0 } });
  const [octaves, setoctaves] = useState<number[]>([2]);
  const octavesRef = useRef<RefObject[]>([]);

  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const triggerQueue: string[] = [];

  const triggerTone = (scale: string, octave: number, action: Action) => {
    const now = Tone.now();
    const note = `${scale}${octave}`;
    if (action === 'down') {
      if (triggerQueue.indexOf(note) === -1) {
        triggerQueue.push(note);
        synth.triggerAttack(`${scale}${octave}`, now);
      }
    } else {
      triggerQueue.splice(triggerQueue.indexOf(note), 1);
      synth.triggerRelease(note, now);
    }
  };

  const addLowOctave = () => {
    if (octaves[0] === -2) {
      return;
    }

    setoctaves([octaves[0] - 1, ...octaves]);
  };
  const addHighOctave = () => {
    if (octaves[octaves.length - 1] === 8) {
      return;
    }
    setoctaves([...octaves, octaves[octaves.length - 1] + 1]);
  };

  // * 找到按键对应的枚举
  const findKeyIntoEnum: (
    key: string,
  ) => [any, number, KeyType] | [undefined, undefined, KeyType] = (key: string) => {
    let targetEnum;
    let targetIndex;
    let targetType: KeyType = 'white';
    keyboardInterval.some((interval, index) => {
      if (Object.keys(interval.white).indexOf(key) > -1) {
        targetEnum = interval.white;
        targetIndex = index;
        targetType = 'white';
        return true;
      }
      if (Object.keys(interval.black).indexOf(key) > -1) {
        targetEnum = interval.black;
        targetIndex = index;
        targetType = 'black';
        return true;
      }
      return false;
    });

    return [targetEnum, targetIndex, targetType];
  };

  // * 键盘按下动画
  const keyDownToTone = (key: string, action: Action) => {
    const [targetEnum, targetIndex, targetType] = findKeyIntoEnum(key);
    if (targetEnum && (targetIndex || targetIndex === 0) && octaves[targetIndex]) {
      triggerTone(targetEnum[key], octaves[targetIndex], action);
      const handleKeyIndex = Object.keys(targetEnum).indexOf(key);
      const octavesRefNode = octavesRef.current[targetIndex];
      if (octavesRefNode) octavesRefNode.handleKeyEvent(handleKeyIndex, action, targetType);
    }
  };

  const boardHandler = (e: KeyboardEvent, action: Action) => {
    keyDownToTone(e.key, action);
  };

  useEffect(() => {
    octavesRef.current = octavesRef.current.slice(0, octaves.length);
    window.addEventListener('keydown', (e) => boardHandler(e, 'down'));
    window.addEventListener('keyup', (e) => boardHandler(e, 'up'));
  }, [octaves]);

  return (
    <div>
      <PianoContainer style={props}>
        {octaves.map((currentOctave, i) => (
          <PianoOctave
            key={currentOctave}
            currentOctave={currentOctave}
            triggerTone={triggerTone}
            ref={(el: RefObject) => {
              octavesRef.current[i] = el;
            }}
          />
        ))}
      </PianoContainer>
      <div className="container mx-auto flex flex-row bg-gray-200 m-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          type="button"
          onClick={addLowOctave}
        >
          增加下Octave
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          type="button"
          onClick={addHighOctave}
        >
          增加上Octave
        </button>
      </div>
    </div>
  );
};

Piano.propTypes = {};

export default Piano;
