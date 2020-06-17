import cancelTimer from './cancelTimer';
import startTimer, {currentTimerTime} from './startTimer';

const updateTimer = async (addedSeconds: number) => {
  await cancelTimer();
  const newTime = currentTimerTime + addedSeconds;
  startTimer(newTime);
};

export default updateTimer;
