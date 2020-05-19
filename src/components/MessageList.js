import fetch from 'isomorphic-fetch';
import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const MessageList = () => { 
  const { authState } = useOktaAuth();
  const [messages, setMessages] = useState(null);

  // fetch messages
  useEffect(() => {
    if (authState.isAuthenticated) {
      const { accessToken } = authState;
      try {
        async function fetchData() {
          const response = await fetch(`http://localhost:5000/api/messages`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }            
          });
          const data = await response.json();
          setMessages(data.messages);
        }
      fetchData();
      } catch (err) { 
        // handle error as needed
        console.log(err);
      }
    }
  }, [authState]);

  if (!messages) { 
    return <div>Loading...</div>;
  }

  const items = messages.map(message =>
    <li key={message}>{message}</li>
  );
  return <ul>{items}</ul>;
};
export default MessageList;

