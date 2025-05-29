import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/logos/logo.png'
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar_back py-4">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center navLink" to="/">
          <img src={Logo} alt="Logo" width="82" height="82" className="me-2" />
          Pontos Turísticos
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" end>
                Lista
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/create" className="nav-link">
                Cadastrar Ponto Turístico
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
