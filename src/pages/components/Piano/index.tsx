import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as Tone from 'tone';

const PITCH_MAPPING: string[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const PianoContainer = styled.div.attrs({
  className: 'flex',
})`
  width: 80vw;
  height: 60vh;
  margin: auto;
  margin-top: 100px;
`;

const PianoOctave = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
`;

const PianoKeys = styled.div`
  position: relative;
  flex: 1;
  transition: all 0.1s ease-in-out;
  &:not(:first-of-type) {
    margin-left: -1px;
  }
`;
const WhiteKey = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 5px 3px 0 #aaa;
  transition: all 0.1s ease-in-out;
  &:active {
    top: 5px;
    color: #333;
    box-shadow: 0 1px 3px #aaa;
    opacity: 0.7;
  }
`;
const BlackKey = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 1;
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
  &:active {
    height: 82%;
    color: #333;
    box-shadow: 0 2px 2px 2px #aaa, inset 0 0 0 1px rgb(0 0 0);
    opacity: 0.9;
  }
`;

const Piano = () => {
  // const [synth, setSynth] = useState(null);

  const synth: Tone.Synth<Tone.SynthOptions> = new Tone.Synth().toDestination();
  const WhiteMouseDown = (scale: string, octave: number) => {
    const now = Tone.now();
    synth.triggerAttackRelease(`${scale}${octave}`, '4n', now);
    // synth.triggerAttackRelease("E4", "4n", now + 0.5);
    // synth.triggerAttackRelease("G4", "8n", now + 1);
  };
  const WhiteMouseUp = () => {
    // synth.triggerAttack();
    // synth.triggerAttackRelease("E4", "4n", now + 0.5);
    // synth.triggerAttackRelease("G4", "8n", now + 1);
  };

  const switchKeyDown = (key: string) => {
    switch (key) {
      case 'a':
        WhiteMouseDown('C', 1);
        break;
      case 's':
        WhiteMouseDown('D', 1);
        break;

      case 'd':
        WhiteMouseDown('E', 1);
        break;

      case 'f':
        WhiteMouseDown('F', 1);
        break;

      case 'g':
        WhiteMouseDown('G', 1);
        break;

      case 'h':
        WhiteMouseDown('A', 1);
        break;

      case 'j':
        WhiteMouseDown('B', 1);
        break;

      case 'k':
        WhiteMouseDown('C', 2);
        break;

      case 'l':
        WhiteMouseDown('D', 2);
        break;

      case ';':
        WhiteMouseDown('E', 2);
        break;

      case "'":
        WhiteMouseDown('F', 2);
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

  return (
    <PianoContainer>
      <div className="mt-4" />
      {[1, 2, 3].map((octave) => (
        <PianoOctave>
          {[1, 2, 3, 4, 5, 6, 7].map((scale) => (
            <PianoKeys key={scale}>
              <WhiteKey
                onMouseDown={() => WhiteMouseDown(`${PITCH_MAPPING[scale - 1]}`, octave)}
                onMouseUp={() => WhiteMouseUp()}
              />
              {[3, 7].indexOf(scale) === -1 && (
                <BlackKey
                  onMouseDown={() => WhiteMouseDown(`${PITCH_MAPPING[scale - 1]}#`, octave)}
                />
              )}
            </PianoKeys>
          ))}
        </PianoOctave>
      ))}
    </PianoContainer>
  );
};

export default Piano;
