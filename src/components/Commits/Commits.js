import React, { useState, useEffect } from 'react';
import style from './Commits.module.scss';

function Commits(state) {
  const [commits, setCommits] = useState([]);
  const [originalCommits, setOriginalCommits] = useState([]);
  const [emptyCommits, setEmptyCommits] = useState(false);
  const [emptyResponse, setEmptyResponse] = useState(false);

  useEffect(() => {
    async function loadCommits() {
      const response = await fetch(`https://api.github.com/repos/${state.repoLogin}/${state.repoName}/commits`);
      const commits = await response.json();

      setEmptyResponse(!response.ok); 
      setEmptyCommits(emptyResponse);
      setCommits(commits)
      setOriginalCommits(commits)
    }
    
    loadCommits()
  }, [state.repoName, state.repoLogin, emptyResponse])

  
  const humanizeDate = (date) => {
    const dateObject = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return dateObject.toLocaleDateString('pt-BR', options)
  }

  const filterCommits = (target) => {
    const term = target.target.value.toLowerCase();
    let commitsFiltered = originalCommits.filter(item => {
      let message = item.commit.message.toLowerCase();

      return ( message.indexOf(term) !== -1 )
    })

    setEmptyCommits(!commitsFiltered.length)
    setCommits(commitsFiltered)
  }

  const mountCommits = () => {
    if(emptyResponse)
      return <li className={style.CommitItem}>Não há commits neste repositório</li>

    if(emptyCommits)
      return <li className={style.CommitItem}>Não há commits para exibir</li>
    
    return commits.map((commit, index) => {
      const commitDetails = commit.commit;
      const { message, author } = commitDetails;

      return <li key={index} className={style.CommitItem}> 
        <h3 className={style.CommitMessage}>{ message }</h3>
        <div className={style.CommitDetails}>
          <p>
            <span className={style.CommitDetailItem}>Autor: </span> { author.name }
          </p>
          <p>
            <span className={style.CommitDetailItem}>Data: </span> { humanizeDate(author.date) }
          </p>
        </div>
      </li> 
    })
  }

  return (
    <div className={style.Commits}>
      <header className={style.Header}>
        <h2 className={style.HeaderTitle}>{state.repoName}</h2>
        <p className={style.HeaderDescription}>{state.repoDescription}</p>
        <label htmlFor="searchBox">Filtrar commits</label>
        <input type="search" id="searchBox" className={style.SearchBox} autoFocus onKeyUp={(target) => filterCommits(target)} disabled={emptyResponse} />
      </header>
      <div className={style.List}>
        <ul className={style.CommitList}>
          { mountCommits() }
        </ul>
      </div>
    </div>
  );
}

export default Commits;
