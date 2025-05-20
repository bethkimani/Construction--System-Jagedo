import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

const config = {
  botName: "HealthBot",
  initialMessages: [{ id: 1, message: "Hello! How can I assist you today?", createdBy: "bot" }],
};

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.toLowerCase().includes('appointment')) {
      actions.handleAppointmentQuery();
    } else if (message.toLowerCase().includes('symptom')) {
      actions.handleSymptomQuery();
    } else {
      actions.handleDefault();
    }
  };
  return <div>{React.Children.map(children, (child) => React.cloneElement(child, { parse }))}</div>;
};

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleAppointmentQuery = () => {
    const botMessage = createChatBotMessage("You can book an appointment from the Doctors page!");
    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
  };

  const handleSymptomQuery = () => {
    const botMessage = createChatBotMessage("Please describe your symptoms, and I'll help you!");
    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
  };

  const handleDefault = () => {
    const botMessage = createChatBotMessage("I'm not sure how to help with that. Try asking about appointments or symptoms!");
    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
  };

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { actions: { handleAppointmentQuery, handleSymptomQuery, handleDefault } })
      )}
    </div>
  );
};

const ChatbotComponent = () => (
  <div className="fixed bottom-4 right-4">
    <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
  </div>
);

export default ChatbotComponent;