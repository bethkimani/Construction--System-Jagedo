import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

const config = {
  botName: "BuildBot",
  initialMessages: [{ id: 1, message: "Hello! How can I assist you with your construction project today?", createdBy: "bot" }],
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

const ConstructionChatbot = () => (
  <div className="fixed bottom-4 right-4 z-50">
    <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
  </div>
);

export default ConstructionChatbot;