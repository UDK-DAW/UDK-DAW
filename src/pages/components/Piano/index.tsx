import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { useSpring } from 'react-spring';
import { PianoContainer } from '../styledComponents';
import { KeySpringProps } from '../types';

import PianoOctave from '../PianoOctave';

const Piano = () => {
  const props: KeySpringProps = useSpring({ opacity: 1, from: { opacity: 0 } });
  const [octaves, setoctaves] = useState<number[]>([2]);

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
  return (
    <div>
      <PianoContainer style={props}>
        {octaves.map((octave) => (
          <PianoOctave key={octave} currentOctave={octave} />
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
