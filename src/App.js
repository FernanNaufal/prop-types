import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { Link } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import Navigation from './components/Navigation';
import AddNotePage from "./pages/AddNotePage";
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { getUserLogged, putAccessToken } from './utils/api';


class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
    }
    
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount(){
    const {data} = await getUserLogged();
    this.setState(() => {
      return{
        authedUser: data,
        initializing: false
      }
    })
  }

  async onLoginSuccess({accessToken}){
    putAccessToken(accessToken);
    const {data} =  await getUserLogged();

    this.setState(()=> {
      return{
        authedUser: data,
      }
    })
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null
      }
    });
    putAccessToken('');
  }

  render(){
    if (this.state.initializing) {
      return null;
    }
    if(this.state.authedUser === null){
      return(
        <div className='app-container'>
          <header>
          <h1>Aplikasi Catatan</h1>
        </header>
        <main>
        <Routes>
          <Route path='/*' element={<LoginPage loginSuccess={this.onLoginSuccess}/>} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
        </div>
      )
    }

    return (
      <div className="app-container">
        <header>
          <h1><Link to="/">Aplikasi Catatan</Link></h1>
          <Navigation logout={this.onLogout}/>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/notes/:id' element={<InfoPage />} />
            <Route path='/add' element={<AddNotePage />} />
          </Routes>
        </main>
      </div>
    );
  }
}

export default App;