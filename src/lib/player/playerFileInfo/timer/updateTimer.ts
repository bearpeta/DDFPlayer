import startTimer, {currentTimerTime} from './startTimer';
import cancelTimer from './cancelTimer';

const updateTimer = async (addedSeconds: number) => {
  await cancelTimer();
  const newTime = currentTimerTime + addedSeconds;
  startTimer(newTime);
};

export default updateTimer;
