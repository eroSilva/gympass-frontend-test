import React from 'react';
import style from './Repository.module.scss';
import Commits from '../Commits';

function Repository(state) {
  return (
    <div className={`${style.Modal} ${state.modalOpen ? style.isOpen : ''}`}>
      <button className={style.CloseButton} onClick={() => state.cleanRepositoryDetails()}>X</button>
      {state.repositoryData.length !== 0 ? <Commits repoLogin={state.repositoryData.owner.login} repoName={state.repositoryData.name} repoDescription={state.repositoryData.description}/> : null}
    </div>
  );
}

export default Repository;
