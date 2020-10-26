import React, {useState, useEffect} from 'react';
import Enviar from './Enviar';
import { toast } from 'react-toastify';

const keys = require('../config/keys');

const Tabla = () => {
  
    const [list, setList] = useState([])
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {
        console.log('variable => ', keys.apiURL);
        crearTabla();
    }, []);
  
    const crearTabla = () =>{
        fetch(keys.apiURL + 'basedatos/consultatotalpacientes')
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            setList(data);
        });
    }

    const addOrEdit = () => {
        //console.log('desde addOrEdit');

        crearTabla();
        setCurrentId('');
    }

    const onDelete = (id) =>{
        if(window.confirm("¿Seguro que lo quieres eliminar?"))
        {
            //console.log(id);
            
            let myHeaders = new Headers();
            const options = {
                    method: 'DELETE',
                    headers: myHeaders,
                    body: new URLSearchParams({
                    'id': id
                    }),
            }
                
                
            fetch(keys.apiURL + 'basedatos/eliminar-paciente/'+id, options)
            .then((res) => res.json())
            .then((data) => {
                //console.log(data);
                toast('Se eliminó al paciente con exito', {
                    type: 'success',
                    autoClose: 2000
                });
                crearTabla();
            });

           
        
        }
        
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
                                <i className="material-icons text-danger slc-cursor-pointer" title="Eliminar" onClick={() =>onDelete(paciente.id)}>close</i>
                                <i className="material-icons slc-cursor-pointer" title="Editar" onClick={() => setCurrentId(paciente.id)}>edit</i>
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
