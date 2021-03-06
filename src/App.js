import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {    
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New Repository ${Date.now()}`,
      url: `http://localhost/new-repository/${Date.now()}`,
      techs: [ "React JS" ] 
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
      .then(response => {
        if (response.status === 204) {
          setRepositories(repositories.filter(repository => repository.id !== id))
        }
      })
      .catch(err => {
        console.log(err);
      });    
  }  

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              { repository.title }

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
               </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
