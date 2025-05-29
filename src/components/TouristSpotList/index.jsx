import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TouristSpotApi from "../../services/touristSpotApi";
import Loading from "../Loading";

const TouristSpotList = () => {
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
      <h2>Pontos Turísticos</h2>

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

              <div className="d-flex gap-2 mt-3">
                <button className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1">
                  <i className="fas fa-edit"></i>
                  Editar
                </button>
                <button className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1">
                  <i className="fas fa-trash"></i>
                  Deletar
                </button>
              </div>

              <button className="btn btn-outline-secondary mt-3" onClick={() => setSelectedSpot(null)}>
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
