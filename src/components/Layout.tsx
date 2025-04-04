import React from 'react';
import { Sidebar } from './Sidebar';
import MainContent from './MainContent';

export const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <MainContent />
      </div>
    </div>
  );
}; 