import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSprings } from 'react-spring';
import * as Tone from 'tone';
import {
  PianoOctaveStyled,
  PianoKeys,
  WhiteKey,
  BlackKeyContainer,
  BlackKey,
} from '../styledComponents';
import { KeySpringProps } from '../types';

const PITCH_MAPPING: string[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

interface KeyHandleInterface {
  (scale: number, index: number): void;
}

type Props = {
  currentOctave: number;
};

const PianoOctave: React.FunctionComponent<Props> = ({ currentOctave }) => {
  const synth: Tone.Synth<Tone.SynthOptions> = new Tone.Synth().toDestination();
  const MouseDownTone = (scale: string, octave: number) => {
    const now = Tone.now();
    console.log(`${scale}${octave}`);
    synth.triggerAttackRelease(`${scale}${octave}`, '4n', now);
    // synth.triggerAttackRelease("E4", "4n", now + 0.5);
    // synth.triggerAttackRelease("G4", "8n", now + 1);
  };

  const switchKeyDown = (key: string) => {
    switch (key) {
      case 'a':
        MouseDownTone('C', 1 + currentOctave);
        break;
      case 's':
        MouseDownTone('D', 1 + currentOctave);
        break;

      case 'd':
        MouseDownTone('E', 1 + currentOctave);
        break;

      case 'f':
        MouseDownTone('F', 1 + currentOctave);
        break;

      case 'g':
        MouseDownTone('G', 1 + currentOctave);
        break;

      case 'h':
        MouseDownTone('A', 1 + currentOctave);
        break;

      case 'j':
        MouseDownTone('B', 1 + currentOctave);
        break;

      case 'k':
        MouseDownTone('C', 2 + currentOctave);
        break;

      case 'l':
        MouseDownTone('D', 2 + currentOctave);
        break;

      case ';':
        MouseDownTone('E', 2 + currentOctave);
        break;

      case "'":
        MouseDownTone('F', 2 + currentOctave);
        break;

      default:
        break;
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switchKeyDown(e.key);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  type Action = 'up' | 'down';

  const whiteKeySpringsFn: (
    index: number,
    currentIndex?: number,
    action?: Action,
  ) => KeySpringProps = (index, currentIndex, action) => {
    if (index === currentIndex && action === 'down') {
      return {
        top: '7px',
        color: '#333',
        boxShadow: '0 1px 3px #aaa',
        opacity: '0.7',
      };
    }
    return {
      top: '0px',
      color: '#333',
      boxShadow: '0 5px 3px 0 #aaa',
      opacity: '1',
    };
  };
  const blackKeySpringsFn: (
    index: number,
    currentIndex?: number,
    action?: Action,
  ) => KeySpringProps = (index, currentIndex, action) => {
    if (index === currentIndex && action === 'down') {
      return {
        height: '82%',
        boxShadow: '0 2px 2px 2px #aaa, inset 0 0 0 1px rgb(0 0 0)',
        opacity: '0.9',
      };
    }
    return {
      height: '80%',
      boxShadow: '0 5px 2px 2px #111, inset 0 0 0 1px rgb(0 0 0)',
      opacity: '1',
    };
  };

  const [whiteKeySprings, setWhiteKeySprings] = useSprings(PITCH_MAPPING.length, (index) => {
    return whiteKeySpringsFn(index);
  });
  const [blackKeySprings, setBlackKeySprings] = useSprings(PITCH_MAPPING.length, (index) => {
    return blackKeySpringsFn(index);
  });

  const whiteKeyMouseDown: KeyHandleInterface = (scale, index) => {
    MouseDownTone(`${PITCH_MAPPING[index]}`, currentOctave);
    setWhiteKeySprings((i) => {
      return whiteKeySpringsFn(i, index, 'down');
    });
  };

  const whiteKeyMouseUp: KeyHandleInterface = (scale, index) => {
    MouseDownTone(`${PITCH_MAPPING[index]}`, currentOctave);
    setWhiteKeySprings((i) => {
      return whiteKeySpringsFn(i, index, 'up');
    });
  };
  const blackKeyMouseDown: KeyHandleInterface = (scale, index) => {
    MouseDownTone(`${PITCH_MAPPING[index]}#`, currentOctave);
    setBlackKeySprings((i) => {
      return blackKeySpringsFn(i, index, 'down');
    });
  };

  const blackKeyMouseUp: KeyHandleInterface = (scale, index) => {
    MouseDownTone(`${PITCH_MAPPING[index]}#`, currentOctave);
    setBlackKeySprings((i) => {
      return blackKeySpringsFn(i, index, 'up');
    });
  };

  return (
    <PianoOctaveStyled>
      <PianoKeys>
        {whiteKeySprings.map((props, index) => (
          <WhiteKey
            style={props}
            onMouseDown={() => {
              whiteKeyMouseDown(index, index);
            }}
            onMouseUp={() => {
              whiteKeyMouseUp(index, index);
            }}
          />
        ))}
      </PianoKeys>
      <PianoKeys>
        {blackKeySprings.map((props, index) => (
          <BlackKeyContainer>
            {[2, 6].indexOf(index) === -1 && (
              <BlackKey
                style={props}
                onMouseDown={() => {
                  blackKeyMouseDown(index, index);
                }}
                onMouseUp={() => {
                  blackKeyMouseUp(index, index);
                }}
              />
            )}
          </BlackKeyContainer>
        ))}
      </PianoKeys>
    </PianoOctaveStyled>
  );
};

PianoOctave.propTypes = {
  currentOctave: PropTypes.number.isRequired,
};

export default PianoOctave;
