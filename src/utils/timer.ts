import { TimeType } from "../types/types";

const parseSeconds = (seconds: number): TimeType => {
  const hour = Math.floor(seconds / 60 / 60);
  const minute = Math.floor((seconds - (hour * 60 * 60)) / 60);
  const second = seconds - (hour * 60 * 60) - (minute * 60);

  return {
    second, minute, hour
  };
};

class Timer {
  private counted: number;
  private intervalId!: NodeJS.Timer | null;
  private static instance: Timer | null = null;

  static getInstance(): Timer {
    if (this.instance === null) {
      this.instance = new Timer();
    }

    return this.instance;
  }

  private constructor() {
    this.counted = 0;
  }

  getTime(): TimeType {
    return parseSeconds(this.counted);
  }

  startTimer(callBack: (i: TimeType) => void) {
    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(() => {
      this.counted += 1;
      callBack(parseSeconds(this.counted));
    }, 1000);
  }

  stopTimer() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
    this.intervalId = null;
    this.counted = 0;
  }
}

export const timerInstance = Timer.getInstance();