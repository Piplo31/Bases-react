import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';


const Formulario = (props) => {

    const initialStateValues = {
        id: '',
        nombre: '',
        apellido: '',
        numid: ''
    }

    const [values, setValues] = useState(initialStateValues);

    useEffect(() => {
        if(props.currentId === ''){
            setValues({...initialStateValues});
        }else{
            getPacienteById(props.currentId);
        }
    }, [props.currentId])
    
    const handleInputChange = (event) => {
        //console.log(event.target.value);
        const {name, value} = event.target;
        setValues({...values, [name]: value});
    }
   
    const handleSubmit = (event) => {
        event.preventDefault();
        
        console.log(values);

        if(props.currentId !== ''){
            editPaciente();
        }else{  
            addPaciente();
        }
        setValues({...initialStateValues});
        props.addOrEdit();
    }

    const getPacienteById = (id) => {
        console.log('getPacienteById', id);
      
        let myHeaders = new Headers();
        const options = {
          method: 'GET',
          headers: myHeaders
        }
      
        fetch('http://localhost:3001/basedatos/consultar-paciente/'+id, options)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setValues({...data[0]});
          });
      }

    const addPaciente = () => {
        let myHeaders = new Headers();
        const options = {
            method: 'POST',
            headers: myHeaders,
            body: new URLSearchParams({
            'nombre': values.nombre,
            'apellido': values.apellido,
            'numid': values.numid
            }),
        }
        
        fetch('http://localhost:3001/basedatos/insertarpaciente', options)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            toast('Se registro al paciente con exito', {
                type: 'success',
                autoClose: 2000
            });
        });
    }

    const editPaciente = () => {
        let myHeaders = new Headers();
        const options = {
            method: 'POST',
            headers: myHeaders,
            body: new URLSearchParams({
            'nombre': values.nombre,
            'apellido': values.apellido,
            'numid': values.numid,
            'id': props.currentId
            }),
        }
        
        fetch('http://localhost:3001/basedatos/actualizar-paciente', options)
        .then((res) => res.json())
        .then((data) => {
        console.log(data);
            toast('Se actualizo al paciente con exito', {
                type: 'success',
                autoClose: 2000
            });
        });
    }
  
    
    return (
        <form id="contact" onSubmit={handleSubmit} method="post">
            <h3>{(props.currentId === '' ? 'Crear ': 'Actualizar ')} Paciente</h3>
            
            <fieldset>
                <input 
                    placeholder="Nombre Paciente" 
                    name="nombre" 
                    type="text" 
                    required 
                    value={values.nombre}
                    onChange={handleInputChange} />
            </fieldset>
            <fieldset>
                <input 
                    placeholder="Apellido Paciente" 
                    name="apellido" 
                    type="text" 
                    required 
                    value={values.apellido}
                    onChange={handleInputChange} />
            </fieldset>
            <fieldset>
                <input 
                    placeholder="Identificación Paciente" 
                    name="numid" 
                    type="text" 
                    required 
                    value={values.numid}
                    onChange={handleInputChange} />
            </fieldset>
            <fieldset>
                <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">
                {(props.currentId === '' ? 'Crear ': 'Actualizar ')}
                </button>
            </fieldset>
        </form>
    );
    
  }
  export default Formulario;

  