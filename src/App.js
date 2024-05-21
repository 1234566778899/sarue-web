import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomeApp } from './components/HomeApp';
import { LoginApp } from './components/LoginApp';
import { RegisterApp } from './components/RegisterApp';
import { IncidenceReportApp } from './components/IncidenceReportApp';
import { SuggestionReportApp } from './components/SuggestionReportApp';
import { UserRegisterApp } from './components/UserRegisterApp';
import { UserReportApp } from './components/UserReportApp';



function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<HomeApp />} />
        <Route exact path='/home' element={<HomeApp />} />
        <Route exact path='/login' element={<LoginApp />} />
        <Route exact path='/register' element={<RegisterApp />} />
        <Route exact path='/admin/*' element={<HomeApp />} >
          <Route path='incidences' element={<IncidenceReportApp />} />
          <Route path='users' element={<UserReportApp />} />
          <Route path='users-register' element={<UserRegisterApp />} />
          <Route path='suggestions' element={<SuggestionReportApp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
