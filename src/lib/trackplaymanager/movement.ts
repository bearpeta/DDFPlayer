import TrackPlayer from 'react-native-track-player';
import Setting from 'lib/setting/Setting';

const seekTo = async (newPosition: number): Promise<void> => {
  return TrackPlayer.seekTo(newPosition);
};

const _calcNewPos = async (
  newPosFunction: (position: number) => number,
): Promise<number> => {
  const position = await TrackPlayer.getPosition();
  return newPosFunction(position);
};

const forward = async (seconds: number): Promise<void> => {
  return seekTo(await _calcNewPos((currentPos) => currentPos + seconds));
};

const goBack = async (seconds: number): Promise<void> => {
  return seekTo(await _calcNewPos((currentPos) => currentPos - seconds));
};

const fastForward = async (): Promise<void> => {
  return seekTo(
    await _calcNewPos(
      (currentPos) => currentPos + Setting.get('playerJumpInterval'),
    ),
  );
};

const fastRewind = async (): Promise<void> => {
  return seekTo(
    await _calcNewPos(
      (currentPos) => currentPos - Setting.get('playerJumpInterval'),
    ),
  );
};

export {seekTo, forward, goBack, fastForward, fastRewind};
