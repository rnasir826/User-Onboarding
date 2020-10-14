import React, {useState} from 'react';
import Users from './components/Users'
import './App.css';
import Form from './components/Form';

function App() {

  
  const [users, setUsers] = useState([]);

  return (
    <div className="App">
      <h1>User Onboarding!</h1>
       <Form setUsers={setUsers} users={users}/>
      <Users users={users} />
    
    </div>
  );
}

export default App;
