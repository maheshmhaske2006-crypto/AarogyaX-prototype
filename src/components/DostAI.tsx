import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const mockResponses: Record<string, string> = {
  stress: "Arre bhai, stress toh sabko hota hai! Par tension mat le. Thoda break le, kuch paani pi, aur 5 minute ke liye aankhen band karke deep breathing kar. Trust me, kaam karega! 💪",
  exam: "Exam ka darr? Bilkul normal hai yaar! But remember, you've prepared well. Bas thoda revision kar, proper sleep le, aur confidence se ja. Tu kar lega! 🎯",
  tired: "Lagta hai bahut thak gaya hai tu. Bhai, rest is important! Thoda power nap le, ya phir apna favourite gaana sun. Energy wapas aa jayegi. Take care! 😊",
  lonely: "Akela feel ho raha hai? Main hoon na tere saath! Sometimes loneliness happens, but you're not alone. Kisi dost ko call kar, ya family se baat kar. Helps a lot! ❤️",
  anxious: "Anxiety ho rahi hai? Breathe yaar, breathe. Abhi jo worry kar raha hai, uska 90% kabhi hota nahi. Present moment mein reh. Tu strong hai! 🌟",
  sleep: "Neend nahi aa rahi? Screen time kam kar, thoda warm milk pi, aur relaxing music sun. Phone door rakh aur sone ki koshish kar. Good night! 🌙",
  default: "Suna maine! Main samajh sakta hoon ki kaisa feel ho raha hoga. Koi baat nahi yaar, sab theek ho jayega. Just take it one step at a time. Main hoon na! 💫"
};

function getAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('stress') || lowerMessage.includes('tension')) {
    return mockResponses.stress;
  } else if (lowerMessage.includes('exam') || lowerMessage.includes('test')) {
    return mockResponses.exam;
  } else if (lowerMessage.includes('tired') || lowerMessage.includes('thak')) {
    return mockResponses.tired;
  } else if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('akela')) {
    return mockResponses.lonely;
  } else if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('nervous')) {
    return mockResponses.anxious;
  } else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('neend')) {
    return mockResponses.sleep;
  }

  return mockResponses.default;
}

export default function DostAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Namaste! Main hoon tera dost, DostAI. 😊 Kya haal hai? Kuch pareshani hai toh freely share kar. I'm here for you!",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(input),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-sage-50 to-white">
      <div className="bg-sage-500 text-white px-6 pt-12 pb-6 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-sage-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">DostAI</h1>
            <p className="text-sage-100 text-sm">Your supportive companion</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-sage-500 text-white rounded-br-md'
                  : 'bg-white text-gray-800 rounded-bl-md shadow-md'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-sage-100' : 'text-gray-400'
                }`}
              >
                {message.timestamp.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 rounded-2xl rounded-bl-md px-4 py-3 shadow-md">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2 max-w-md mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-sage-400 text-gray-800"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sage-600 transition-colors active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
