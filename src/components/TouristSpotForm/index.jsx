import React, { useState, useEffect } from 'react';
import states from '../../data/states';
import TouristSpotApi from "../../services/touristSpotApi";
import Swal from "sweetalert2";
import axios from 'axios';

export default function TouristSpotForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [adress, setAdress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);


  useEffect(() => {
    if (!state) {
      setCities([]);
      setCity('');
      return;
    }

    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
      .then(res => {
        setCities(res.data);
        setCity('');
      })
      .catch(() => {
        setCities([]);
        setCity('');
      });

  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTouristSpot = {
      name,
      description,
      adress,
      city,
      state,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await TouristSpotApi.create(newTouristSpot);

      if (response) {
        Swal.fire("Sucesso", "Ponto turístico cadastrado com sucesso!", "success");
        setName("");
        setDescription("");
        setAdress("");
        setCity("");
        setState("");
      } else {
        Swal.fire("Atenção", response.message || "Não foi possível cadastrar.", "warning");
      }
    } catch (error) {
      const errors = error.response.data.errors;
      const firstKey = Object.keys(errors)[0];
      const firstErrorMsg = errors[firstKey][0];

      Swal.fire("Erro", firstErrorMsg || "Falha ao cadastrar ponto turístico.", "error");
    }
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
        <label htmlFor="description" className="form-label">Descrição</label>
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
          maxLength={250}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="state" className="form-label">Estado</label>
        <select
          id="state"
          className="form-select mt-1"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        >
          <option value="">Selecione Estado</option>
          {states.map((st) => (
            <option key={st.uf} value={st.uf}>
              {st.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="city" className="form-label">Cidade</label>
        <select
          id="city"
          className="form-select mt-1"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          disabled={!cities.length}
        >
          <option value="">Selecione uma cidade</option>
          {cities.map(c => (
            <option key={c.id} value={c.nome}>{c.nome}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-success w-100 mt-3">Salvar</button>
    </form>
  );
}
