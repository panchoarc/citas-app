import React, { Fragment, useState } from "react";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }) => {
  // Crear State de Citas
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });
  const [error, actualizarError] = useState(false);

  // Función que se ejecuta cada que el usuario escribe en un input
  const actualizarState = (e) => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  // Extraer los valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // Cuando el usuario presiona agregar cita
  const submitCita = (e) => {
    e.preventDefault();

    // Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualizarError(true);
      return;
    }
    // Eliminar el mensaje previo
    actualizarError(false);

    // Asignar un ID
    cita.id = uuid();

    // Crear la cita
    crearCita(cita);

    // Reiniciar el form
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <Fragment>
      <h2 data-testid="titulo">Crear Cita</h2>

      {error ? (
        <p data-testid="alerta" className="alerta-error">
          Todos los campos son obligatorios
        </p>
      ) : null}

      <form onSubmit={submitCita}>
        <label htmlFor="mascota">Nombre Mascota</label>
        <input
          id="mascota"
          data-testid="mascota"
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />

        <label htmlFor="propietario">Nombre Dueño</label>
        <input
          id="propietario"
          data-testid="propietario"
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre  Dueño de la mascota"
          onChange={actualizarState}
          value={propietario}
        />

        <label htmlFor="fecha">Fecha</label>
        <input
          id="fecha"
          data-testid="fecha"
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />

        <label htmlFor="hora">Hora</label>
        <input
          id="hora"
          data-testid="hora"
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />

        <label htmlFor="sintomas">Síntomas</label>
        <textarea
          id="sintomas"
          data-testid="sintomas"
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>

        <button
          data-testid="btn-submit"
          type="submit"
          className="u-full-width button"
        >
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};

export default Formulario;
