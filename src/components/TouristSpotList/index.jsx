import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import TouristSpotApi from "../../services/touristSpotApi";
import Loading from "../Loading";
import ActionButtons from '../ActionButtons';

const TouristSpotList = () => {
  const navigate = useNavigate();
  const [spots, setSpots] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [spotsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const fetchSpots = async () => {
    try {
      setLoading(true);
      const response = await TouristSpotApi.getAll();
      console.log("login", response)
      setSpots(response);
    } catch (error) {
      Swal.fire("Erro", "Falha ao carregar os pontos turísticos", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (direction) => {
    const newPage = currentPage + direction;
    const indexStart = (newPage - 1) * spotsPerPage;
    const indexEnd = indexStart + spotsPerPage;
    const hasData = filteredSpots.slice(indexStart, indexEnd).length > 0;

    if (hasData) {
      setCurrentPage(newPage);
    } else {
      Swal.fire("Aviso", "Não há pontos turísticos nesta página.", "info");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Deseja realmente deletar este ponto turístico?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33", 
      cancelButtonColor: "#3085d6" 
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      setLoading(true);
      const response = await TouristSpotApi.delete(id);

      if (response.status) {
        Swal.fire("Sucesso", response.message, "success");
        setSelectedSpot(null)
        await fetchSpots()
      } else {
        Swal.fire("Erro", response.message, "error");

      }
    } catch (error) {
      Swal.fire("Erro", "Falha interna ao deletar o ponto turístico", "error");
      console.error(error)
    } finally {
      setLoading(false);

    }
  };

  const handleEdit = (id) => {
    navigate(`/editar/${id}`);
  };


  useEffect(() => {
    fetchSpots();
  }, []);

  console.log("sports", spots)
  const filteredSpots = Array.isArray(spots)
    ? spots.filter((spot) =>
      [
        spot.name,
        spot.description,
        spot.adress,
        spot.city,
        spot.state
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    : [];

  const totalPages = Math.ceil(filteredSpots.length / spotsPerPage);
  const indexOfLast = currentPage * spotsPerPage;
  const indexOfFirst = indexOfLast - spotsPerPage;
  const currentTouristSpots = filteredSpots.slice(indexOfFirst, indexOfLast);

  return (
    <div className="container mt-4">

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nome, descrição ou localização"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {loading && <Loading />}

      {!loading && (
        <>
          {selectedSpot ? (
            <div className="card p-3">
              <h4>{selectedSpot.name}</h4>
              <p><strong>Descrição:</strong> {selectedSpot.description}</p>
              <p><strong>Localização:</strong> {selectedSpot.adress}, {selectedSpot.city} - {selectedSpot.state}</p>

              <ActionButtons
                onEdit={() => handleEdit(selectedSpot.id)}
                onDelete={() => handleDelete(selectedSpot.id)}
              />

              <button className="btn btn-outline-secondary btnGreen mt-3" onClick={() => setSelectedSpot(null)}>
                Voltar à lista
              </button>
            </div>
          ) : (
            <>
              {currentTouristSpots.length > 0 ? (
                <ul className="list-group mb-3">
                  {currentTouristSpots.map((spot) => (
                    <li
                      key={spot.id}
                      className="list-group-item list-group-item-action mb-5"
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedSpot(spot)}
                    >
                      <strong className="strongName">{spot.name}</strong> – {spot.city} - {spot.state}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum ponto turístico encontrado.</p>
              )}

              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-outline-success"
                  onClick={() => handlePageChange(-1)}
                >
                  Anterior
                </button>

                <button
                  className="btn btn-outline-success"
                  onClick={() => handlePageChange(1)}
                >
                  Próxima
                </button>

              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TouristSpotList;
