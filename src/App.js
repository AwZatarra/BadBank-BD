import React from 'react';
import './App.css';
import NavigationBar from './components/navbar';
import { Outlet } from 'react-router-dom';
import { UserContext } from './components/user-context'

function App() {
  
  const [loggedIn, setLoggedIn] = React.useState(false);

  const ctx = React.useContext(UserContext);
  
  ctx.loginState = [loggedIn, setLoggedIn];
  

  return (
    <div>
      <NavigationBar/>
      <br/>
      <div className="centered">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
