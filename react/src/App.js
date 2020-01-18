import React, { useState, useEffect } from 'react';

import api from './services/api';

import Dev from './components/Dev';
import DevForm from './components/DevForm';

import './global.css';
import './App.css';
import './Main.css';
import './Sidebar.css';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data } = await api.get('/devs');
      setDevs(data);
    }

    loadData();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('devs', data);

    setDevs(oldDevs => [...oldDevs, response.data]);
  }

  async function handleRemoveDev(id) {
    await api.delete(`devs/${id}`);

    setDevs(oldDevs => oldDevs.filter(d => d._id !== id));
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <Dev key={dev._id} dev={dev} handleRemove={handleRemoveDev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
