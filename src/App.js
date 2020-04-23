import React, { useState, useEffect } from "react";
import api from "./services/api";
import moment from 'moment';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(response => { setRepositories(response.data); });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
        url: "https://github.com/Rocketseat/umbriel",
        title: `React - ${moment().format("DD/MM/YYYY hh:mm:ss")}`, 
        //${Intl.DateTimeFormat('en-GB').format(Date.now()) não retornava hora
        techs: ["Node", "Express", "TypeScript"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    const response = await api.delete(`repositories/${id}`);
    
    if (response.status === 204)
    setRepositories(repositories.filter(repository => repository.id !== id));
    
    //const repoIndex = repositories.findIndex(repository => repository.id === id);
    //foi trocada a função repositories.splice para repositories.filter
    //o splice retirava o item selecionado de dentro de repositories, mas carregava na tela um elemento nulo
    //o filter corrigiu isso. repoIndex era utilizado no repositories.splice
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
