
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import React, { useState, useEffect} from 'react';



function App() {
  const baseUrl = "https://localhost:44308/api/personas";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [personaSeleccionada, setPersonaSeleccionada]= useState({
    id:'',
    nombre:'',
    telefono: '',
    direccion: ''
  });

  const handleChange=e=>{ 
    const{name, value}=e.target;
    setPersonaSeleccionada({
      ...personaSeleccionada,
      [name]:value
    });
    console.log(personaSeleccionada);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data)
    }).catch(error=>{
      console.log(error)});
  }

  const peticionPost=async()=>{
    delete personaSeleccionada.id;
    await axios.post(baseUrl, personaSeleccionada)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error)});
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+"/"+personaSeleccionada.id, personaSeleccionada)
    .then(response=>{
      var respuesta= response.data;
      var dataAuxiliar = data;
      dataAuxiliar.map(persona=> {
        if (persona.id === personaSeleccionada.id) {
          persona.nombre = respuesta.nombre;
          persona.telefono = respuesta.telefono;
          persona.direccion = respuesta.direccion;
        }
      });
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+personaSeleccionada.id)
    .then(response=>{
      setData(data.filter(persona=>persona.id!==response.data))
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error)});
  }

  const seleccionarPersona=(persona, caso)=>{
    setPersonaSeleccionada(persona);
    (caso==="Editar")?
    abrirCerrarModalEditar():abrirCerrarModalEliminar();
  }

  useEffect(()=>{
    peticionGet()
  },[])

  return (
    <div className="App">
      <br/><br/>
      <button className='btn btn-success' onClick={()=>abrirCerrarModalInsertar()}>Insertar Nueva Persona</button>
      <br/><br/>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {data.map(persona=>(
          <tr key={persona.id}>
            <td>{persona.id}</td>
            <td>{persona.nombre}</td>
            <td>{persona.telefono}</td>
            <td>{persona.direccion}</td>
            <td>
              <button className='btn btn-primary' onClick={()=>seleccionarPersona(persona, "Editar")}>Editar</button> {"  "}
              <button className='btn btn-danger' onClick={()=>seleccionarPersona(persona, "Eliminar")}>Eliminar</button> {"  "}              
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Persona</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br/>
            <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
            <label>Telefono: </label>
            <br/>
            <input type="text" className="form-control" name="telefono" onChange={handleChange}/>
            <label>Dirección: </label>
            <br/>
            <input type="text" className="form-control" name="direccion" onChange={handleChange}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>peticionPost()}>Insertar</button>{"   "}
          <button className='btn btn-danger' onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Persona</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id: </label>
            <br/>
            <input type="text" className="form-control" readOnly value={personaSeleccionada && personaSeleccionada.id}/>
            <label>Nombre: </label>
            <br/>
            <input type="text" className="form-control" onChange={handleChange} value={personaSeleccionada && personaSeleccionada.nombre}/>
            <label>Telefono: </label>
            <br/>
            <input type="text" className="form-control" onChange={handleChange} value={personaSeleccionada && personaSeleccionada.telefono}/>
            <label>Dirección: </label>
            <br/>
            <input type="text" className="form-control" onChange={handleChange} value={personaSeleccionada && personaSeleccionada.direccion}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>peticionPut()}>Editar</button>
          <button className='btn btn-danger' onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal> 

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Esta seguro que desea eliminar esta persona {personaSeleccionada && personaSeleccionada.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={()=>peticionDelete()}>
            Si
          </button>
          <button className='btn btn-secondary' onClick={()=>abrirCerrarModalEliminar()}>
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
