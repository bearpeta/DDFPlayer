import {useEffect} from 'react';
import {AudioFile} from 'lib/audiobooks/type';
import {setDisplayTitleType} from './types';

// This hook sets the title which should be shown in the player modal.
const useDisplayTitle = (
  playingFile: AudioFile | undefined,
  setDisplayTitle: setDisplayTitleType,
) => {
  useEffect(() => {
    if (playingFile === undefined) {
      setDisplayTitle('no album selected');
      return;
    }

    if (playingFile.isNumbered()) {
      setDisplayTitle(`${playingFile.trackNumber()} - ${playingFile.title()}`);
      return;
    }

    // Special audiobooks with just one track sometimes have the same value set for album and title. In this case we will just show the title.
    if (playingFile.album() === playingFile.title()) {
      setDisplayTitle(`SPECIAL - ${playingFile.title()}`);
      return;
    }

    // Rest of the special audiobooks
    setDisplayTitle(`${playingFile.album()} - ${playingFile.title()}`);
  }, [playingFile, setDisplayTitle]);
};

export default useDisplayTitle;
