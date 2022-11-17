import { ButtonHTMLAttributes } from 'react';

export interface TabPanelProps {
  tab?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  children?: React.ReactNode;
  key?: string;
  active?: boolean;
  label: string;
}

export interface Tab extends Omit<TabPanelProps, 'tab' | 'children'> {
  key: string;
  label: string;
}

export type TypeOrientationTabs = 'row' | 'column';

export interface TabsProps {
  items: Tab[];
  defaultActiveKey: string;
  orientationTab?: TypeOrientationTabs;
}

export interface TypeTabPanelProps extends ButtonHTMLAttributes<HTMLButtonElement>, TabPanelProps {}
