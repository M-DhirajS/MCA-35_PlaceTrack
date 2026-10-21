import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AllPlaces from './pages/AllPlaces';
import AddPlace from './pages/AddPlace';
import NotificationToast from './components/NotificationToast';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="app-layout">
      {/* Toast Notifications */}
      <NotificationToast
        notification={notification}
        onClose={handleCloseNotification}
      />

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        <main>
          {activeTab === 'dashboard' && (
            <Dashboard
              setActiveTab={setActiveTab}
              setNotification={setNotification}
            />
          )}

          {activeTab === 'places' && (
            <AllPlaces
              setActiveTab={setActiveTab}
              setNotification={setNotification}
            />
          )}

          {activeTab === 'add' && (
            <AddPlace
              setActiveTab={setActiveTab}
              setNotification={setNotification}
            />
          )}
        </main>
      </div>
    </div>
  );
}
