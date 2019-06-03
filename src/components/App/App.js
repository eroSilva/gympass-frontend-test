import React, { useState, useEffect } from 'react';
import style from './App.module.scss';
import Repositories from '../Repositories';

function App(state) {
  const [userData, setUserData] = useState(state.dataApp);

  useEffect(() => {
    setUserData(state.dataApp)
  }, [state.dataApp])

  return (
    <div className={style.MainContent}>
      <header className={style.Header}>
        <figure className={style.Photo}>
          <img src={userData.avatar_url} alt={`${userData.name} | ${userData.bio}`}/>
        </figure>
        <h2 className={style.UserName}>{userData.name}</h2>
        <h1 className={style.Title}>Github User Infos</h1>
        <p className={style.Description}>Detalhes públicos do meu perfil do Github.</p>
        <button type="button" className={style.UserBackToLogin} onClick={() => {state.backToUser()}}>Escolher outro usuário</button>
      </header>
      <Repositories userName={userData.login} />
    </div>
  );
}

export default App;
