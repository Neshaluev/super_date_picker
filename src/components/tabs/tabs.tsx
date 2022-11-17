import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Tab, TabsProps } from './interface';
import { TabContext } from './tab_context';
import TabNavList from './tab_nav_lits/tab_nav_list';

import './tabs.scss';

import TabPanel from './tab_panel/tab_panel';

function Tabs({ items, defaultActiveKey, orientationTab = 'column', ...rest }: TabsProps) {
  const tabs: Tab[] = React.useMemo(() => items.map((item) => item) || [], [items]);

  const [activeKey, setActiveKey] = useState<string>('');

  useEffect(() => {
    if (defaultActiveKey) {
      setActiveKey(defaultActiveKey);
    }
  }, []);

  const handleActiveTab = (key: string) => {
    setActiveKey(key);
  };

  const clxTabs = clsx('wrapper_tabs', orientationTab);

  return (
    <TabContext.Provider value={{ tabs }}>
      <div className={clxTabs}>
        <TabNavList activeTab={activeKey} handleActiveTab={handleActiveTab} />
        <TabPanel activeKey={activeKey} />
      </div>
    </TabContext.Provider>
  );
}

export const TabSandbox = () => {
  const items = [
    { label: 'Tab 1', key: 'item-1', children: 'Content 1' },
    { label: 'Tab 2', key: 'item-2', children: 'Content 2' },
    { label: 'Tab 3', key: 'item-3', children: 'Content 3' },
  ];
  return <Tabs defaultActiveKey='item-1' items={items} />;
};

export default Tabs;
