import React from 'react';
import { Slider } from '@material-ui/core';
import moment from 'moment';
import { PointInHistory, ShipHistory } from '../../../types/Ship';

interface TimeSliderProps {
  setPointInHistory: React.Dispatch<React.SetStateAction<PointInHistory>>;
  history: ShipHistory;
}

export const TimeSlider: React.FC<TimeSliderProps> = ({
  setPointInHistory,
  history,
}: TimeSliderProps) => {
  const allStates = history.previousStates.concat(history.futureStates);

  const numHistories = allStates.length;
  const numActualHistories = history.previousStates.length;

  const handleChange = (value: number) => {
    setPointInHistory(allStates[value]);
    console.log(allStates[value]);
  };

  const marks = allStates.map((state, index, arr) => {
    const prevDate = index > 0 ? new Date(arr[index - 1].time) : null;
    const thisDate = new Date(state.time);
    const label =
      prevDate && prevDate.toDateString() === thisDate.toDateString()
        ? ''
        : moment(thisDate).format("Do MMM 'YY").toString();
    return {
      value: index,
      label,
    };
  });
  return (
    <Slider
      className="mt-5"
      defaultValue={numActualHistories - 1}
      min={0}
      max={numHistories - 1}
      aria-labelledby="discrete-slider-custom"
      step={1}
      valueLabelDisplay="off"
      marks={marks}
      onChange={(_, value) => handleChange(value as number)}
    />
  );
};
