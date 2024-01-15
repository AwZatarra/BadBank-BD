import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {UserContext} from './components/user-context'

//import the routes
import Home from './routes/home';
import CreateAccount from './routes/createaccount';
import Login from './routes/login';
import Deposit from './routes/deposit';
import Withdraw from './routes/withdraw';
import AllData from './routes/alldata';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContext.Provider value={
        {
          users:[
            { name:'Pool',
              email:'poolriveramolina@gmail.com',
              password:'123456',
              balance:100,
              history:[] }
          ],
          currentUser: null,
          userIndex: null,
          loginState: null
        }
      } >
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}/>
          <Route path="createaccount" element={<CreateAccount />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="alldata" element={<AllData />} />
          <Route path="login" element={<Login/>} />
        </Route>
      </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.querySelector('#root')
);