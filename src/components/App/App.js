import React, { useState, useEffect } from 'react';
import style from './App.module.scss';
import Repositories from '../Repositories';
import Env from '../../Env.js';

function App() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function loadUserData() {
      const responseUserData = await fetch(`https://api.github.com/users/${Env.userLogin}`);
      const responseUserDataJSON = await responseUserData.json();

      setUserData(responseUserDataJSON)
    }
    
    loadUserData()
  }, [])

  return (
    <main className={style.Main}>
      <header className={style.Header}>
        <figure className={style.Photo}>
          <img src={userData.avatar_url} alt={`${userData.name} | ${userData.bio}`}/>
        </figure>
        <h2 className={style.UserName}>{userData.name}</h2>
        <h1 className={style.Title}>Github User Infos</h1>
        <p className={style.Description}>Detalhes públicos do meu perfil do Github.</p>
      </header>
      <Repositories />
    </main>
  );
}

export default App;
