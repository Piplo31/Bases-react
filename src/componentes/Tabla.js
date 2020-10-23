import React, {useState, useEffect} from 'react';
import Enviar from './Enviar';

const Tabla = () => {
  
    const [list, setList] = useState([])
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {
        crearTabla();
    }, []);
  
    const crearTabla = () =>{
        fetch('http://localhost:3001/basedatos/consultatotalpacientes')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setList(data);
        });
    }

    const addOrEdit = () => {
        console.log('desde addOrEdit');

        crearTabla();
        setCurrentId('');
    }

    return (
        <div className="row">
            <div className="col-md-5 p-2">
                <Enviar  {... {addOrEdit, currentId}}/>
            </div>
            <div className="col-md-7">
                {list.map(paciente => (
                    <div key={paciente.id} className="card mb-1">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h5>{paciente.nombre} {paciente.apellido}</h5>
                                <div>
                                <i className="material-icons text-danger">close</i>
                                <i className="material-icons " onClick={() => setCurrentId(paciente.id)}>edit</i>
                                </div>
                            </div>
                            <p>Identificación: {paciente.numid}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tabla;
