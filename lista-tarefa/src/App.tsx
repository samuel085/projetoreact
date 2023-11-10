import React, { useState } from 'react'
import './App.css'

function App() {
  const [lista, setLista] = useState<string[]>([])
  const [novoItem, setNovoItem] = useState('')

  function adicionaItem(e: React.FormEvent) {
    e.preventDefault()
    if (!novoItem) {
      return
    }
    setLista([...lista, novoItem])
    setNovoItem('')
  }

  return (
    <div>
      <h1>Lista de tarefas</h1>
      <form onSubmit={adicionaItem}>
        <input
          id="input-entrada"
          type="text"
          value={novoItem}
          maxLength={60}
          onChange={(e) => {
            setNovoItem(e.target.value)
          }}
          placeholder="adicione uma tarefa"
        />
        <button className="add" type="submit">
          Add
        </button>
      </form>
      <div className="listaTarefa">
        {lista.length > 0 ? (
          lista.map((item, index) => (
            <div className="item" key={index}>
              <span>{item}</span>
              <button
                className="delete"
                onClick={() => {
                  const novaLista = [...lista]
                  novaLista.splice(index, 1)
                  setLista(novaLista)
                }}
              >
                delete
              </button>
            </div>
          ))
        ) : (
          <div className="item">
            {/* <span></span> */}
            {/* <button className="delete">delete</button> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
