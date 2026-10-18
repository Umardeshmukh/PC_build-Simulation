import React from 'react';
import { useGameStore } from './store/gameStore';
import { MainMenu } from './screens/MainMenu';
import { SandboxSetup } from './screens/SandboxSetup';
import { CareerDashboard } from './screens/CareerDashboard';
import { Workshop } from './screens/Workshop';
import { SettingsScreen } from './screens/SettingsScreen';
import { ContributeScreen } from './screens/ContributeScreen';
import { AboutScreen } from './screens/AboutScreen';
import { NotificationToast } from './components/NotificationToast';
import { BootLoadingOverlay } from './components/BootLoadingOverlay';

export function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);

  return (
    <div className="pc-forge-app">
      <NotificationToast />
      <BootLoadingOverlay />

      <main className="screen-fade-in" key={currentScreen}>
        {currentScreen === 'menu' && <MainMenu />}
        {currentScreen === 'sandbox-setup' && <SandboxSetup />}
        {currentScreen === 'career-dashboard' && <CareerDashboard />}
        {currentScreen === 'workshop' && <Workshop />}
        {currentScreen === 'settings' && <SettingsScreen />}
        {currentScreen === 'contribute' && <ContributeScreen />}
        {currentScreen === 'about' && <AboutScreen />}
      </main>
    </div>
  );
}

export default App;
