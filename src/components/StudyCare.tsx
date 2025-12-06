import { useState, useEffect } from 'react';
import { Droplet, Coffee, Users, AlertCircle, Phone, Mail } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  icon: typeof Droplet;
  completed: boolean;
}

export default function StudyCare() {
  const [showSOS, setShowSOS] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: 'water', label: 'Drank Water?', icon: Droplet, completed: false },
    { id: 'break', label: 'Took a Break?', icon: Coffee, completed: false },
    { id: 'posture', label: 'Posture Check', icon: Users, completed: false },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('aarogyax-checklist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setChecklist((prev) =>
          prev.map((item) => ({
            ...item,
            completed: parsed[item.id] || false,
          }))
        );
      } catch (e) {
        console.error('Failed to parse checklist from localStorage');
      }
    }
  }, []);

  const toggleItem = (id: string) => {
    setChecklist((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      const toSave: Record<string, boolean> = {};
      updated.forEach((item) => {
        toSave[item.id] = item.completed;
      });
      localStorage.setItem('aarogyax-checklist', JSON.stringify(toSave));
      return updated;
    });
  };

  const completionPercentage = Math.round(
    (checklist.filter((item) => item.completed).length / checklist.length) * 100
  );

  const emergencyContacts = [
    { name: 'Mental Health Helpline', phone: '1800-599-0019', type: 'National' },
    { name: 'Student Counseling', phone: '1800-123-4567', type: 'Campus' },
    { name: 'Crisis Support', phone: '022-2754-6669', type: 'Mumbai' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-white pb-6">
      <div className="bg-sage-500 text-white px-6 pt-12 pb-8 rounded-b-3xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Namaste, Student!</h1>
        <p className="text-sage-100">Your daily wellness tracker</p>
      </div>

      <div className="px-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Health Nudge</h2>
            <div className="text-sage-600 font-bold text-lg">{completionPercentage}%</div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div
              className="bg-gradient-to-r from-sage-500 to-sage-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <div className="space-y-4">
            {checklist.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    item.completed
                      ? 'bg-sage-50 border-sage-500'
                      : 'bg-white border-gray-200 hover:border-sage-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all ${
                      item.completed
                        ? 'bg-sage-500 border-sage-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {item.completed && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <Icon
                    className={`w-5 h-5 mr-3 ${
                      item.completed ? 'text-sage-600' : 'text-gray-400'
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      item.completed ? 'text-sage-700' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => setShowSOS(!showSOS)}
          className="w-full bg-gradient-to-r from-saffron-500 to-saffron-600 text-white font-semibold py-4 rounded-2xl shadow-lg flex items-center justify-center space-x-2 hover:shadow-xl transition-all active:scale-95"
        >
          <AlertCircle className="w-6 h-6" />
          <span>Quick SOS</span>
        </button>

        {showSOS && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border-2 border-saffron-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Emergency Mental Health Support
            </h3>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{contact.name}</div>
                    <div className="text-sm text-gray-500 mb-2">{contact.type}</div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center text-sage-600 font-medium"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {contact.phone}
                    </a>
                  </div>
                </div>
              ))}
              <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-800">Email Support</div>
                    <a
                      href="mailto:support@campuscounseling.edu"
                      className="text-sm text-blue-600"
                    >
                      support@campuscounseling.edu
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
