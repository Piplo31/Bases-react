import React from 'react';
import "./App.css";
import logo from './CRUD-LOGO.svg';
import Tabla from './componentes/Tabla';
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <div className="container p-4">
            <img src={logo} className="img-fluid" alt="logo" />
            <div>
                <Tabla />
            </div>
            <oTastContainer />
        </div>
    );
}

export default App;
