import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [lista, setLista] = useState<string[]>([])
  const [novoItem, setNovoItem] = useState('')

  useEffect(() => {
    const listaSalva = localStorage.getItem('lista')
    if (listaSalva) {
      setLista(JSON.parse(listaSalva))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('lista', JSON.stringify(lista))
  }, [lista])

  useEffect(() => {
    return () => {
      localStorage.setItem('lista', JSON.stringify(lista))
    }
  }, [lista])

  function adicionaItem(e: React.FormEvent) {
    e.preventDefault()
    if (!novoItem) {
      return
    }
    setLista([...lista, novoItem])
    setNovoItem('')
  }

  const deletaItem = (index: number) => {
    const novaLista = lista.filter((_, i) => i !== index)
    setLista(novaLista)
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
              <button className="delete" onClick={() => deletaItem(index)}>
                delete
              </button>
            </div>
          ))
        ) : (
          <div className="item">
            {/* <span>m</span>
            <button className="delete">delete</button> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
