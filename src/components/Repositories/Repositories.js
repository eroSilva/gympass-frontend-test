import React, { useState, useEffect } from 'react';
import Repository from '../Repository';
import style from './Repositories.module.scss';

function Repositories(state) {
  const [repositories, setRepositories] = useState([]);
  const [repository, setRepository] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  
  useEffect(() => {
    async function loadRepositories() {
      const responseRepositories = await fetch(`https://api.github.com/users/${state.userName}/repos`);
      const responseRepositoriesJSON = await responseRepositories.json();

      setRepositories(responseRepositoriesJSON)
    }
    
    loadRepositories()
  }, [state.userName])

  const getRepositoryDetails = (repositoryData) => {
    setModalOpen(true)
    setRepository(repositoryData)
  }

  const cleanRepositoryDetails = () => {
    setRepository([])
    setModalOpen(false)
  }

  return (
    <section>
      <ul className={style.List}>
        {
          repositories.map((repository, index) => {
            return (
              <li key={index} className={style.Item}>
                <button type="button" className={style.ItemButton} onClick={() => getRepositoryDetails(repository)}>
                  <span className={style.RepositoryName}>{repository.name}</span>
                </button>
              </li>
            )
          })
        }
      </ul>
      <Repository repositoryData={repository} modalOpen={modalOpen} cleanRepositoryDetails={cleanRepositoryDetails} />
    </section>
  );
}

export default Repositories;
