import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import * as Tone from 'tone';
import { useSpring } from 'react-spring';
import { PianoContainer } from '../styledComponents';
import { KeySpringProps, Action } from '../types';

import PianoOctave from '../PianoOctave';

const Piano = () => {
  const props: KeySpringProps = useSpring({ opacity: 1, from: { opacity: 0 } });
  const [octaves, setoctaves] = useState<number[]>([2]);

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

  // TODO: 增加键盘按下动画

  const octave = 1;

  const keyDownToTone = (key: string, action: Action) => {
    switch (key) {
      case 'a':
        triggerTone('C', 1 + octave, action);
        break;
      case 's':
        triggerTone('D', 1 + octave, action);
        break;

      case 'd':
        triggerTone('E', 1 + octave, action);
        break;

      case 'f':
        triggerTone('F', 1 + octave, action);
        break;

      case 'g':
        triggerTone('G', 1 + octave, action);
        break;

      case 'h':
        triggerTone('A', 1 + octave, action);
        break;

      case 'j':
        triggerTone('B', 1 + octave, action);
        break;

      case 'k':
        triggerTone('C', 2 + octave, action);
        break;

      case 'l':
        triggerTone('D', 2 + octave, action);
        break;

      case ';':
        triggerTone('E', 2 + octave, action);
        break;

      case "'":
        triggerTone('F', 2 + octave, action);
        break;

      default:
        break;
    }
  };

  const boardHandler = (e: KeyboardEvent, action: Action) => {
    keyDownToTone(e.key, action);
  };

  useEffect(() => {
    window.addEventListener('keydown', (e) => boardHandler(e, 'down'));
    window.addEventListener('keyup', (e) => boardHandler(e, 'up'));
  }, []);

  return (
    <div>
      <PianoContainer style={props}>
        {octaves.map((octave) => (
          <PianoOctave key={octave} currentOctave={octave} triggerTone={triggerTone} />
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
