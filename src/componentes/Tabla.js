import React from 'react';

const Tabla = () => {
  // Declara una nueva variable de estado, que llamaremos "count".
  
  const crearTabla = () =>{
     
   
     fetch('http://localhost:3001/basedatos/consultatotalpacientes')
  .then(response => response.json())
  .then(data => {
    
      var x = document.getElementById("tabla"); 
        
      
      var a="<table border==\"1\"<tr>";
      var key;
      for (key in data[0]) {
        console.log(key);
          a +='<th>' + key + '</th>';
      }
      a +="</tr>";
      for (var i = 0; i < data.length; i++) {
          a +='<tr>';
          var key;
          for (key in data[i]) {
          a +='<td>' + data[i][key] + '</td>';
      }
          a +='</tr>';
      }
      a +="</table>";
      x.innerHTML=a;
      
      console.log(a);
  
  });
    
    
  }
  

  return (
    <div>
      <div id="tabla">
        <h3>Presione el boton para consultar</h3>
      </div>
      <button onClick={crearTabla} className="boton-consulta">Consultar</button>
    </div>
  );
}

export default Tabla;
