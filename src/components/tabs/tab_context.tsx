import React from 'react';
import { Tab } from './interface';

export interface TabContextProps {
  tabs: Tab[];
}

export const TabContext = React.createContext<TabContextProps>({ tabs: [] });
