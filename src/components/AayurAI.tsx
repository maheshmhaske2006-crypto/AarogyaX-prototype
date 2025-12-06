import { useState } from 'react';
import { Leaf, AlertTriangle, Lightbulb, Clock } from 'lucide-react';

interface Remedy {
  symptom: string;
  herb: string;
  practice: string;
  duration: string;
  instructions: string;
  dosha: string;
}

const remedies: Record<string, Remedy> = {
  stress: {
    symptom: 'Exam Stress',
    herb: 'Ashwagandha',
    practice: 'Meditation & Pranayama',
    duration: '15 minutes daily',
    instructions: 'Take 300mg Ashwagandha twice daily with warm milk. Practice Anulom Vilom for stress relief.',
    dosha: 'Vata imbalance',
  },
  eyestrain: {
    symptom: 'Eye Strain',
    herb: 'Triphala',
    practice: 'Eye exercises & Screen breaks',
    duration: '20-20-20 rule',
    instructions: 'Use Triphala eye wash morning and evening. Every 20 minutes, look at something 20 feet away for 20 seconds.',
    dosha: 'Pitta aggravation',
  },
  insomnia: {
    symptom: 'Insomnia',
    herb: 'Brahmi & Jatamansi',
    practice: 'Yoga Nidra',
    duration: '30 minutes before bed',
    instructions: 'Take Brahmi tea 1 hour before sleep. Practice Shavasan and avoid screens 2 hours before bedtime.',
    dosha: 'Vata disturbance',
  },
  headache: {
    symptom: 'Headache',
    herb: 'Shankhpushpi',
    practice: 'Head massage with coconut oil',
    duration: '10 minutes',
    instructions: 'Apply coconut oil on temples and scalp. Practice Sheetali Pranayama for cooling effect.',
    dosha: 'Pitta excess',
  },
  digestion: {
    symptom: 'Digestive Issues',
    herb: 'Triphala & Ginger',
    practice: 'Mindful eating',
    duration: 'With meals',
    instructions: 'Take Triphala powder at night. Include ginger tea before meals. Eat in a calm environment.',
    dosha: 'Agni (digestive fire) imbalance',
  },
  anxiety: {
    symptom: 'Anxiety',
    herb: 'Tulsi (Holy Basil)',
    practice: 'Bhramari Pranayama',
    duration: '5-10 minutes',
    instructions: 'Drink Tulsi tea 2-3 times daily. Practice humming bee breath to calm the nervous system.',
    dosha: 'Vata derangement',
  },
};

export default function AayurAI() {
  const [selectedSymptom, setSelectedSymptom] = useState<string>('');
  const [showRemedy, setShowRemedy] = useState(false);

  const symptoms = [
    { value: '', label: 'Select your concern...' },
    { value: 'stress', label: 'Exam Stress' },
    { value: 'eyestrain', label: 'Eye Strain' },
    { value: 'insomnia', label: 'Insomnia / Sleep Issues' },
    { value: 'headache', label: 'Headache' },
    { value: 'digestion', label: 'Digestive Issues' },
    { value: 'anxiety', label: 'Anxiety' },
  ];

  const handleSubmit = () => {
    if (selectedSymptom) {
      setShowRemedy(true);
    }
  };

  const currentRemedy = selectedSymptom ? remedies[selectedSymptom] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-sage-50 to-yellow-50 pb-6">
      <div className="bg-gradient-to-r from-sage-600 to-sage-500 text-white px-6 pt-12 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AayurAI</h1>
            <p className="text-sage-100">Ancient Wisdom, Modern Care</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Lightbulb className="w-6 h-6 text-saffron-500 mr-2" />
            Find Your Remedy
          </h2>

          <p className="text-gray-600 text-sm mb-6">
            Based on Ayurvedic principles, select your concern to receive personalized guidance from ancient Vedic texts.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are you experiencing?
              </label>
              <select
                value={selectedSymptom}
                onChange={(e) => {
                  setSelectedSymptom(e.target.value);
                  setShowRemedy(false);
                }}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent text-gray-700"
              >
                {symptoms.map((symptom) => (
                  <option key={symptom.value} value={symptom.value}>
                    {symptom.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!selectedSymptom}
              className="w-full bg-gradient-to-r from-sage-500 to-sage-600 text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              Get Ayurvedic Guidance
            </button>
          </div>
        </div>

        {showRemedy && currentRemedy && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-gradient-to-br from-saffron-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-saffron-200">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-saffron-500 rounded-full flex items-center justify-center mr-4">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{currentRemedy.symptom}</h3>
                  <p className="text-sm text-gray-600 italic">Dosha: {currentRemedy.dosha}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Leaf className="w-4 h-4 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800">Herbal Remedy</h4>
                  </div>
                  <p className="text-gray-700 ml-11">{currentRemedy.herb}</p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Lightbulb className="w-4 h-4 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800">Practice</h4>
                  </div>
                  <p className="text-gray-700 ml-11">{currentRemedy.practice}</p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Clock className="w-4 h-4 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800">Duration</h4>
                  </div>
                  <p className="text-gray-700 ml-11">{currentRemedy.duration}</p>
                </div>

                <div className="bg-sage-50 rounded-xl p-4 border-l-4 border-sage-500">
                  <h4 className="font-semibold text-gray-800 mb-2">Instructions</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{currentRemedy.instructions}</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-2xl p-5 border-2 border-red-200">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Important Disclaimer</h4>
                  <p className="text-sm text-red-700 leading-relaxed">
                    These AI suggestions are based on traditional Vedic texts and Ayurvedic principles. They are for informational purposes only and should not replace professional medical advice. Please consult a qualified healthcare provider or Ayurvedic practitioner for serious health issues or before starting any new treatment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
