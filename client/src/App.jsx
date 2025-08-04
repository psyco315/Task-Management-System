import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginBase from './components/login/Base.jsx';
import HomeBase from './components/home/Base.jsx';
import PrivateRoute from './PrivateRoute.jsx';

function App() {
  // const [userList, setUserList] = useState([]);

  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3000/user');
  //     setUserList(response.data.users);

  //   } catch (error) {
  //     console.error('Failed to fetch users:', error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginBase />} />
        
        <Route path="/group" element={<PrivateRoute>
          <HomeBase />
        </PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
