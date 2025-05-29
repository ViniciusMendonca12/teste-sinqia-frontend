import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TouristSpotApi from "../../services/touristSpotApi";

const TouristSpotList = () => {
  const [spots, setSpots] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [spotsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        setLoading(true);
        const response = await TouristSpotApi.getAll();
        setSpots(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar pontos turísticos:", error);
        Swal.fire("Erro", "Falha ao carregar os pontos turísticos", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  
 
};

export default TouristSpotList;
