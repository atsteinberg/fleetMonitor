import React from 'react';
import { Slider } from '@material-ui/core';
import moment from 'moment';
import { PointInHistory, ShipHistory } from '../../../types/ShipInterface';

interface TimeSliderProps {
  setPointInHistory: React.Dispatch<
    React.SetStateAction<PointInHistory | undefined>
  >;
  history: ShipHistory | null;
}

export const TimeSlider: React.FC<TimeSliderProps> = ({
  setPointInHistory,
  history,
}: TimeSliderProps) => {
  const allStates = history?.previousStates.concat(history.futureStates);

  const numHistories = allStates?.length;
  const numActualHistories = history?.previousStates.length;

  const handleChange = (value: number) => {
    if (allStates) setPointInHistory(allStates[value]);
    // console.log(allStates[value]);
  };
  let marks;
  if (allStates) {
    marks = allStates.map((state, index, arr) => {
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
  }
  if (allStates) {
    return (
      <Slider
        className="mt-5"
        defaultValue={(numActualHistories as number) - 1}
        min={0}
        max={(numHistories as number) - 1}
        aria-labelledby="discrete-slider-custom"
        step={1}
        valueLabelDisplay="off"
        marks={marks}
        onChange={(_, value) => handleChange(value as number)}
      />
    );
  }
  return <></>;
};
