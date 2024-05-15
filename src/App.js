import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomeApp } from './components/HomeApp';
import { LoginApp } from './components/LoginApp';
import { RegisterApp } from './components/RegisterApp';



function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<HomeApp />} />
        <Route exact path='/login' element={<LoginApp />} />
        <Route exact path='/register' element={<RegisterApp />} />
      </Routes>
    </>
  );
}

export default App;
