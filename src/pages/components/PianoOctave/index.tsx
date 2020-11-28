import React, { useImperativeHandle, forwardRef, Ref } from 'react';
import PropTypes from 'prop-types';
import { useSprings } from 'react-spring';
import {
  PianoOctaveStyled,
  PianoKeys,
  WhiteKey,
  BlackKeyContainer,
  BlackKey,
} from '../styledComponents';
import { KeySpringProps, Action, RefObject } from '../types';

const PITCH_MAPPING: string[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

interface KeyHandleInterface {
  (scale: number, index: number, action: Action): void;
}

type Props = {
  currentOctave: number;
  triggerTone: Function;
};

const PianoOctave = forwardRef(({ currentOctave, triggerTone }: Props, ref: Ref<RefObject>) => {
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

  const whiteKeyMouseHandler: KeyHandleInterface = (scale, index, action) => {
    triggerTone(`${PITCH_MAPPING[index]}`, currentOctave, action);
    setWhiteKeySprings((i) => {
      return whiteKeySpringsFn(i, index, action);
    });
  };
  const blackKeyMouseHandler: KeyHandleInterface = (scale, index, action) => {
    triggerTone(`${PITCH_MAPPING[index]}#`, currentOctave, action);
    setBlackKeySprings((i) => {
      return blackKeySpringsFn(i, index, action);
    });
  };

  useImperativeHandle(ref, () => ({
    handleKeyEvent: (handleKeyIndex, action, type) => {
      if (type === 'white') {
        console.log(action);
        setWhiteKeySprings((i) => {
          return whiteKeySpringsFn(i, handleKeyIndex, action);
        });
      } else if (type === 'black') {
        setBlackKeySprings((i) => {
          return blackKeySpringsFn(i, handleKeyIndex, action);
        });
      }
    },
  }));

  return (
    <PianoOctaveStyled>
      <PianoKeys>
        {whiteKeySprings.map((props, index) => (
          <WhiteKey
            style={props}
            onMouseDown={() => {
              whiteKeyMouseHandler(index, index, 'down');
            }}
            onMouseUp={() => {
              whiteKeyMouseHandler(index, index, 'up');
            }}
            key={`${currentOctave + index}`}
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
                  blackKeyMouseHandler(index, index, 'down');
                }}
                onMouseUp={() => {
                  blackKeyMouseHandler(index, index, 'up');
                }}
                key={`${currentOctave + index}#`}
              />
            )}
          </BlackKeyContainer>
        ))}
      </PianoKeys>
    </PianoOctaveStyled>
  );
});

PianoOctave.propTypes = {
  currentOctave: PropTypes.number.isRequired,
  triggerTone: PropTypes.func.isRequired,
};

export default PianoOctave;
