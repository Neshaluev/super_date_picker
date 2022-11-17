import React, { useContext } from 'react';
import { TabContext } from '../tab_context';
import TapPaneItem from './tap_pane_item/tap_pane_item';

import './tab_panel.scss';

interface TabPanelProps {
  activeKey: string;
}

const TabPanel = ({ activeKey }: TabPanelProps) => {
  const { tabs } = useContext(TabContext);

  return (
    <div className='tab_panel'>
      {tabs.map(({ key, ...rest }) => {
        const active = key === activeKey;

        return <TapPaneItem active={active} key={key} {...rest} />;
      })}
    </div>
  );
};

export default TabPanel;
