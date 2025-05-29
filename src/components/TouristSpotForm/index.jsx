import React, { useState } from 'react';
import states from '../../data/states';

export default function TouristSpotForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [adress, setAdress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, description, adress, state, city });
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nome</label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Descriçao</label>
        <input
          type="text"
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={100}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="adress" className="form-label">Endereço</label>
        <input
          type="text"
          id="adress"
          className="form-control"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="state" className="form-label">Estado</label>
        <select
          id="state"
          className="form-select"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        >
          <option value="">Select a state</option>
          {states.map((st) => (
            <option key={st.code} value={st.code}>
              {st.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="city" className="form-label">Cidade</label>
        <input
          type="text"
          id="city"
          className="form-control"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-success">Salvar</button>
    </form>
  );
}
