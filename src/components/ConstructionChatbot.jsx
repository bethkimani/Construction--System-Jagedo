import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

const config = {
  botName: "BuildBot",
  initialMessages: [
    { id: 1, message: "Hello! How can I assist you with your construction project today?", createdBy: "bot" },
    { id: 2, message: "You can minimize me by clicking the minimize button!", createdBy: "bot" },
  ],
};

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.toLowerCase().includes('project')) {
      actions.handleProjectQuery();
    } else if (message.toLowerCase().includes('material')) {
      actions.handleMaterialQuery();
    } else {
      actions.handleDefault();
    }
  };
  return <div>{React.Children.map(children, (child) => React.cloneElement(child, { parse }))}</div>;
};

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleProjectQuery = () => {
    const botMessage = createChatBotMessage("You can assign a project from the Builders page!");
    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
  };

  const handleMaterialQuery = () => {
    const botMessage = createChatBotMessage("You can order materials from the Project List page under Material Supply!");
    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
  };

  const handleDefault = () => {
    const botMessage = createChatBotMessage("I'm not sure how to help with that. Try asking about projects or materials!");
    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
  };

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { actions: { handleProjectQuery, handleMaterialQuery, handleDefault } })
      )}
    </div>
  );
};

const ConstructionChatbot = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700"
        >
          Open Chatbot
        </button>
      ) : (
        <div className="relative">
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="bg-gray-300 text-gray-800 p-2 rounded-full hover:bg-gray-400"
            >
              Minimize
            </button>
          </div>
          <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
        </div>
      )}
    </div>
  );
};

export default ConstructionChatbot;