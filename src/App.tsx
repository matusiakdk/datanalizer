import { TopBar } from './components/layout/TopBar';
import { MainContent } from './components/dashboard/MainContent';
import { MeetingInterface } from './components/meeting/MeetingInterface';
import { MinimizedMeeting } from './components/meeting/MinimizedMeeting';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AllProjects } from './components/projects/AllProjects';
import { useState } from 'react';

export default function App() {
  const [isMeetingActive, setIsMeetingActive] = useState(false);
  const [isMeetingMinimized, setIsMeetingMinimized] = useState(false);

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={
            <div className={isMeetingActive && !isMeetingMinimized ? "hidden" : "relative"}>
              <TopBar onStartMeeting={() => setIsMeetingActive(true)} />
              <div className="bg-white">
                <MainContent />
              </div>
            </div>
          } />
          <Route path="/projects" element={<AllProjects />} />
        </Routes>

        {isMeetingActive && (
          isMeetingMinimized ? (
            <MinimizedMeeting 
              onMaximize={() => setIsMeetingMinimized(false)}
              onEndMeeting={() => {
                setIsMeetingActive(false);
                setIsMeetingMinimized(false);
              }}
            />
          ) : (
            <MeetingInterface 
              onMinimize={() => setIsMeetingMinimized(true)}
              onEndMeeting={() => {
                setIsMeetingActive(false);
                setIsMeetingMinimized(false);
              }}
            />
          )
        )}
      </div>
    </Router>
  );
}