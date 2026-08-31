'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-row">
      {/* Navigation Sidebar Drawer */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64">
        {/* Header Telemetry Bar */}
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        {/* Dynamic Route Content */}
        <main className="flex-grow p-4 md:p-6 overflow-y-auto custom-scrollbar flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
};
export default AppShell;
