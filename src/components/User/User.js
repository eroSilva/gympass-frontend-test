import React, { useState } from 'react';
import style from './User.module.scss';
import App from '../App';

function User() {
  const [showApp, setShowApp] = useState(false);
  const [dataApp, setDataApp] = useState([]);
  const [userReturn, setUserReturn] = useState('');

  const requestUserData = async function(formEvent) {
    formEvent.preventDefault();

    const userLogin = new FormData(formEvent.target).get('userGithub');
    const responseUserData = await fetch(`https://api.github.com/users/${userLogin}`);
    const responseUserDataJSON = await responseUserData.json();

    return {
      responseInfos: responseUserData,
      responseData: responseUserDataJSON
    };
  }

  const getUserData = async (event) =>{
    const {responseData, responseInfos} = await requestUserData(event);

    if(responseInfos.status !== 200){
      setUserReturn('Não foi possível encontrar este repositório. Verifique o login e tente novamente.')
      return;
    }
    
    setDataApp(responseData)
    setShowApp(true)
  }

  const backToUser = () => {
    setShowApp(false)
  }

  return (
    <main>
      <section className={`${style.User} ${showApp ? style.UserHidden : ''}  `}>
        <h1 className={style.UserTitle}>De qual usuário do Github você gostaria de ver os dados públicos?</h1>
        <form method="GET" onSubmit={(event) => getUserData(event)}>
          <input type="text" id="userGithub" name="userGithub" className={style.UserName} defaultValue="erosilva" autoFocus onChange={() => setUserReturn('')}/>
          <label htmlFor="userGithub" className={style.UserReturn}>{userReturn}</label>
          <button type="submit" id="btnGetGithubInfos" className={style.BtnGitubInfos}>Mostrar</button>
        </form>
      </section>
      {showApp ?  <App dataApp={dataApp} backToUser={backToUser} /> : null}
    </main>
  );
}

export default User;
