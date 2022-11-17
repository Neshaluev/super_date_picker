import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';

import { OperationType, RangeTimeType } from './common_time_ranges/common_time_ranges';
import { builderRangeOperation } from './utils';

export interface IQuickSelectContext {
  operationMap: Map<string, IOperation>;
  startQuickDate: Dayjs;
  endQuickDate: Dayjs;
  handleRangeQuickDate: (...args: any) => void;
  handleSetStartQuickDate: (...args: any) => void;
  handleSetQuickDate: (...args: any) => void;
  handleSetAmountTime: (...args: any) => void;
  handleSetTimeType: (...args: any) => void;
  handleSetNextTime: (...args: any) => void;
  handleSetPreviusTime: (...args: any) => void;
}

export const QuickSelectContext = React.createContext<IQuickSelectContext>(
  {} as IQuickSelectContext,
);

export interface IOperation {
  id: string;
  type: string;
  title: string;
  description: string;
  time: Dayjs;
  endTime: Dayjs;
  startTime: Dayjs;
}

export const operations = {
  last: (time: OperationType, value: number) => dayjs().subtract(value, time),
  next: (time: OperationType, value: number) => dayjs().add(value, time),
};

export function ProviderQuickSelectContext<T>({ children }: React.PropsWithChildren<T>) {
  const [startQuickDate, setStartQuickDate] = React.useState(() => dayjs());
  const [endQuickDate, setEndQuickDate] = React.useState(() => dayjs());
  const [operationMap, _] = React.useState(() => new Map<string, IOperation>());

  const [amountTimeCtx, setAmountTimeCtx] = React.useState<number>(() => 15);
  const [timeTypeCtx, setTimeTypeCtx] = React.useState<OperationType>('minutes');

  const handleRangeQuickDate = (
    timeRange: RangeTimeType,
    amountTime: number,
    time: OperationType,
  ) => {
    const resultDayjs = operations[timeRange](time, amountTime);

    const endTime = timeRange === 'last' ? resultDayjs : dayjs();
    const startTime = timeRange === 'next' ? resultDayjs : dayjs();

    const operation = builderRangeOperation(timeRange, amountTime, time, endTime, startTime);

    operationMap.set(operation.id, operation as IOperation);

    setStartQuickDate(() => startTime);
    setEndQuickDate(() => endTime);
  };

  const handleSetStartQuickDate = (day: Dayjs) => {
    setStartQuickDate(() => day);
  };

  const handleSetQuickDate = (operation: IOperation) => {
    setEndQuickDate(operation.endTime);
    setStartQuickDate(operation.startTime);
  };

  const handleSetAmountTime = (amount: number) => {
    setAmountTimeCtx(amount);
  };

  const handleSetTimeType = (type: OperationType) => {
    setTimeTypeCtx(type);
  };

  const handleSetPreviusTime = () => {
    setEndQuickDate(() => endQuickDate.subtract(amountTimeCtx, timeTypeCtx));
    setStartQuickDate((dayjs) => startQuickDate.subtract(amountTimeCtx, timeTypeCtx));

    const operation = builderRangeOperation(
      '',
      amountTimeCtx,
      timeTypeCtx,
      endQuickDate,
      startQuickDate,
    );
    operationMap.set(operation.id, operation as IOperation);
  };

  const handleSetNextTime = () => {
    setEndQuickDate(() => endQuickDate.add(amountTimeCtx, timeTypeCtx));
    setStartQuickDate((dayjs) => startQuickDate.add(amountTimeCtx, timeTypeCtx));
    const operation = builderRangeOperation(
      '',
      amountTimeCtx,
      timeTypeCtx,
      endQuickDate,
      startQuickDate,
    );
    operationMap.set(operation.id, operation as IOperation);
  };

  const date = React.useMemo(
    () => ({
      operationMap,
      startQuickDate,
      endQuickDate,
      handleRangeQuickDate,
      handleSetStartQuickDate,
      handleSetQuickDate,
      handleSetAmountTime,
      handleSetTimeType,
      handleSetPreviusTime,
      handleSetNextTime,
    }),
    [startQuickDate, endQuickDate, operationMap],
  );

  return <QuickSelectContext.Provider value={date}>{children}</QuickSelectContext.Provider>;
}
