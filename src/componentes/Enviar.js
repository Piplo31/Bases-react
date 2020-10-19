import React from 'react';

class Formulario extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
   
    handleSubmit(event) {
      event.preventDefault();
      var formulario = document.getElementById('contact');
      let datos = new FormData(formulario);
      let nombrepaciente = datos.get('nombre');
      let apellidopaciente = datos.get('apellido');
      let idpaciente = datos.get('identificacion');
      let myHeaders = new Headers();

      const options = {
        method: 'POST',
        headers: myHeaders,
        body: new URLSearchParams({
          'nombre': nombrepaciente,
          'apellido': apellidopaciente,
          'numid': idpaciente
        }),
      }
    
      fetch('http://localhost:3001/basedatos/insertarpaciente', options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
        document.getElementById("contact").reset();

      alert('Se registro al paciente con exito');

    }
  
    render() {
      return (
        <form id="contact" onSubmit={this.handleSubmit} method="post">
        <h3>Enviar Paciente</h3>
        
        <fieldset>
          <input placeholder="Nombre Paciente" name="nombre" type="text" tabIndex="1" required autoFocus />
        </fieldset>
        <fieldset>
          <input placeholder="Apellido Paciente" name="apellido" type="text" tabIndex="1" required autoFocus />
        </fieldset>
        <fieldset>
          <input placeholder="Id Paciente" name="identificacion" type="text" tabIndex="2" required />
        </fieldset>
        <fieldset>
          <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
        </fieldset>
      </form>
      );
    }
  }
  export default Formulario;

  