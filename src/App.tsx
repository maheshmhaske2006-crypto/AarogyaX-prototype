import { useState } from 'react';
import { Heart, MessageCircle, Leaf } from 'lucide-react';
import StudyCare from './components/StudyCare';
import DostAI from './components/DostAI';
import AayurAI from './components/AayurAI';

type Tab = 'studycare' | 'dostai' | 'aayurai';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('studycare');

  const tabs = [
    { id: 'studycare' as Tab, label: 'StudyCare', icon: Heart },
    { id: 'dostai' as Tab, label: 'DostAI', icon: MessageCircle },
    { id: 'aayurai' as Tab, label: 'AayurAI', icon: Leaf },
  ];

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'studycare' && <StudyCare />}
        {activeTab === 'dostai' && <DostAI />}
        {activeTab === 'aayurai' && <AayurAI />}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? 'text-sage-500' : 'text-gray-400'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-normal'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default App;
