import React, { useState, useEffect } from 'react';

function App() {
  const [tarefas, definirTarefas] = useState([]);
  const [novaTarefa, definirNovaTarefa] = useState('');
  const [modoEdicao, definirModoEdicao] = useState(false);
  const [tarefaAtual, definirTarefaAtual] = useState(null);

  useEffect(() => {
    const tarefasArmazenadas = JSON.parse(localStorage.getItem('tarefas')) || [];
    definirTarefas(tarefasArmazenadas);
  }, []);

  useEffect(() => {
    if (tarefas.length > 0) {
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }
  }, [tarefas]);

  const adicionarTarefa = () => {
    if (novaTarefa.trim() && novaTarefa.length <= 30) {
      definirTarefas([...tarefas, { texto: novaTarefa, concluida: false }]);
      definirNovaTarefa('');
    } else {
      alert("A tarefa deve ter no máximo 30 caracteres");
    }
  };

  const editarTarefa = (tarefa) => {
    definirModoEdicao(true);
    definirNovaTarefa(tarefa.texto);
    definirTarefaAtual(tarefa);
  };

  const atualizarTarefa = () => {
    definirTarefas(tarefas.map(tarefa => tarefa === tarefaAtual ? { ...tarefa, texto: novaTarefa } : tarefa));
    definirModoEdicao(false);
    definirNovaTarefa('');
    definirTarefaAtual(null);
  };

  const alternarConcluida = (tarefa) => {
    definirTarefas(tarefas.map(t => t === tarefa ? { ...t, concluida: !t.concluida } : t));
  };

  const removerTarefa = (tarefa) => {
    definirTarefas(tarefas.filter(t => t !== tarefa));
  };

  return (
    <div className="App">
      <h1 className='text1'>ADICIONAR TAREFA</h1>
      <div id='add'>
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => definirNovaTarefa(e.target.value)}
          placeholder="Adicionar Tarefa"
        />
        <button className='botaoAdicionar' onClick={modoEdicao ? atualizarTarefa : adicionarTarefa}>
          <span className="material-icons"> {modoEdicao ? 'edit' : 'add'} </span>
        </button>
      </div>

      <ul>
        {tarefas.map((tarefa, indice) => (
          <li key={indice} style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}>
          <div className="tarefa-item">
            <label className="checkbox-container">
              <input 
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => alternarConcluida(tarefa)}
              />
              <span className="checkmark"></span>
            </label>
            <span className="tarefa-text">{tarefa.texto}</span>
        
            <div className="botoes">
              <button
                id="edit"
                className={modoEdicao && tarefaAtual === tarefa ? 'botao-editar ativo' : 'botao-editar'}
                onClick={() => editarTarefa(tarefa)}
              >
                <span className="material-icons">edit</span>
              </button>
        
              <button id="lixo" onClick={() => removerTarefa(tarefa)}>
                <span className="material-icons">delete</span>
                
              </button>
            </div>
          </div>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default App;