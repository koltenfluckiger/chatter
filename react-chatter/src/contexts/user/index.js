import React from 'react';

const UserContext = React.createContext({username: null, setUserName: (e) => {}});

export default UserContext;
