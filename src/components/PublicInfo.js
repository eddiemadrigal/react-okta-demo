import React, { useEffect, useState } from 'react'; 

require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = 'http://localhost:5000/api/publicInfo';

const PublicInfo = () => {

  const [myData, setMyData] = useState('');

  useEffect(() => {
    console.log('Fetching data ...');
      fetch(url)
      .then( res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then( res => {
        setMyData(res.data);
      });
  }, []); 
  
  return (
    <div>{myData}</div>
  )

}

export default PublicInfo;