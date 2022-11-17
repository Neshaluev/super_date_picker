import React, { PropsWithChildren, useState } from 'react';

interface ISuperDatePickerContext {}

export const SuperDatePickerContext = React.createContext<ISuperDatePickerContext>(
  {} as ISuperDatePickerContext,
);

export function ProviderSuperDatePicker<T>({ children }: PropsWithChildren<T>) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return <SuperDatePickerContext.Provider value={{}}>{children}</SuperDatePickerContext.Provider>;
}
