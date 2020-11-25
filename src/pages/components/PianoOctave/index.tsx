import React, { useEffect } from 'react';
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

type Action = 'up' | 'down';

const PianoOctave: React.FunctionComponent<Props> = ({ currentOctave }) => {
  const synth: Tone.Synth<Tone.SynthOptions> = new Tone.Synth().toDestination();
  const triggerQueue: string[] = [];
  const triggerTone = (scale: string, octave: number, action: Action) => {
    const now = Tone.now();
    const note = `${scale}${octave}`;
    if (action === 'down') {
      if (triggerQueue.indexOf(note) === -1) {
        triggerQueue.push(note);
        synth.triggerAttack(`${scale}${octave}`);
      }
    } else {
      triggerQueue.splice(triggerQueue.indexOf(note), 1);
      synth.triggerRelease(now);
    }

    // synth.triggerAttackRelease(`${scale}${octave}`, '4n', now);
    // synth.triggerAttackRelease("E4", "4n", now + 0.5);
    // synth.triggerAttackRelease("G4", "8n", now + 1);
  };

  const keyDownToTone = (key: string, action: Action) => {
    switch (key) {
      case 'a':
        triggerTone('C', 1 + currentOctave, action);
        break;
      case 's':
        triggerTone('D', 1 + currentOctave, action);
        break;

      case 'd':
        triggerTone('E', 1 + currentOctave, action);
        break;

      case 'f':
        triggerTone('F', 1 + currentOctave, action);
        break;

      case 'g':
        triggerTone('G', 1 + currentOctave, action);
        break;

      case 'h':
        triggerTone('A', 1 + currentOctave, action);
        break;

      case 'j':
        triggerTone('B', 1 + currentOctave, action);
        break;

      case 'k':
        triggerTone('C', 2 + currentOctave, action);
        break;

      case 'l':
        triggerTone('D', 2 + currentOctave, action);
        break;

      case ';':
        triggerTone('E', 2 + currentOctave, action);
        break;

      case "'":
        triggerTone('F', 2 + currentOctave, action);
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

  // * Spring animation
  const whiteKeySpringsFn: (
    index: number,
    currentIndex?: number,
    action?: Action,
  ) => KeySpringProps = (index, currentIndex, action) => {
    if (index === currentIndex && action === 'down') {
      return {
        top: '7px',
        color: '#333',
        boxShadow: '0 1px 3px 0 rgba(170,170,170,1)',
        opacity: '0.7',
      };
    }
    return {
      top: '0px',
      color: '#333',
      boxShadow: '0 5px 3px 0 rgba(170,170,170,1)',
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
        height: '83%',
        boxShadow: '0 2px 2px 2px #333, inset 0 0 0 1px rgb(0 0 0)',
      };
    }
    return {
      height: '80%',
      boxShadow: '0 5px 2px 2px #111, inset 0 0 0 1px rgb(0 0 0)',
    };
  };

  // * Key event
  const [whiteKeySprings, setWhiteKeySprings] = useSprings(PITCH_MAPPING.length, (index) => {
    return whiteKeySpringsFn(index);
  });
  const [blackKeySprings, setBlackKeySprings] = useSprings(PITCH_MAPPING.length, (index) => {
    return blackKeySpringsFn(index);
  });

  const whiteKeyMouseDown: KeyHandleInterface = (scale, index) => {
    triggerTone(`${PITCH_MAPPING[index]}`, currentOctave, 'down');
    setWhiteKeySprings((i) => {
      return whiteKeySpringsFn(i, index, 'down');
    });
  };

  const whiteKeyMouseUp: KeyHandleInterface = (scale, index) => {
    triggerTone(`${PITCH_MAPPING[index]}`, currentOctave, 'up');
    setWhiteKeySprings((i) => {
      return whiteKeySpringsFn(i, index, 'up');
    });
  };
  const blackKeyMouseDown: KeyHandleInterface = (scale, index) => {
    triggerTone(`${PITCH_MAPPING[index]}#`, currentOctave, 'down');
    setBlackKeySprings((i) => {
      return blackKeySpringsFn(i, index, 'down');
    });
  };

  const blackKeyMouseUp: KeyHandleInterface = (scale, index) => {
    triggerTone(`${PITCH_MAPPING[index]}#`, currentOctave, 'up');
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
