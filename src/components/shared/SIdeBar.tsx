import React from 'react';
import { NavigationBrowse } from '../Navigation';

const SideBar: React.FC = () => {
  return (
    <div className="z-[50]">
      <NavigationBrowse />
    </div>
  );
};

export default SideBar;
