import fetch from 'isomorphic-fetch';
import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const url = 'http://localhost:5000/api/profile';

const Profile = () => { 
  const { authState } = useOktaAuth();
  const [messages, setMessages] = useState('');

  useEffect(() => {
    if (authState.isAuthenticated) {
      const { accessToken } = authState;
      try {
        async function fetchData() {
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }          
          });
          const data = await response.json();    
          setMessages(data.data);
        }
        fetchData();  
      }
      catch (err) {
        console.log(err);
      }
    }
  }, [authState]);       

  if (!messages) { 
    return <div>Loading...</div>;
  }
  return <div>{messages}</div>;
};
export default Profile;