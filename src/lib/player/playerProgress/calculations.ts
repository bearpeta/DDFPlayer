const calcProgressViewLength = (
  wholeLength: number,
  duration: number,
  position: number,
): number => {
  if (wholeLength === 0 || duration === 0 || position === 0) {
    return 0;
  }
  const progressLength = (wholeLength / duration) * position;
  return progressLength;
};

const calcSecondsByPosition = (
  releasedXPosition: number,
  wholeLength: number,
  duration: number,
): number => {
  return (releasedXPosition / wholeLength) * duration;
};

export {calcProgressViewLength, calcSecondsByPosition};
