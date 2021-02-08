import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Formulario from "../components/Formulario";
import userEvent from "@testing-library/user-event";
const crearCita = jest.fn();

test("<Formulario /> Cargar el formulario y revisar que todo es correcto", () => {
  /* const wrapper = render(<Formulario />);
  wrapper.debug(); */

  render(<Formulario crearCita={crearCita} />);

  expect(screen.getByText("Crear Cita")).toBeInTheDocument();
  expect(screen.getByTestId("titulo").tagName).toBe("H2");

  //Boton Submit
  expect(screen.getByTestId("btn-submit").tagName).toBe("BUTTON");
});

test("<Formulario /> Validación de Formulario", () => {
  render(<Formulario crearCita={crearCita} />);

  //Click en boton de submit
  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  const alerta = screen.getByTestId("alerta");
  expect(alerta).toBeInTheDocument();
  expect(alerta.textContent).toBe("Todos los campos son obligatorios");
  expect(alerta.tagName).toBe("P");
  expect(alerta.tagName).not.toBe("BUTTON");
});

test("<Formulario /> Validación de Formulario", () => {

  //Verifica que el formulario se cargue correctamente
  render(<Formulario crearCita={crearCita} />);

  //Enviar datos a formulario a través de userEvent
  userEvent.type(screen.getByTestId("mascota"), "Hook");
  userEvent.type(screen.getByTestId("propietario"), "Francisco");
  userEvent.type(screen.getByTestId("fecha"), "2021-09-10");
  userEvent.type(screen.getByTestId("hora"), "10:30");
  userEvent.type(screen.getByTestId("sintomas"), "Solo duerme");

  //Click en formulario por data-testid
  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  //Se verifica si la alerta existe
  const alerta = screen.queryByTestId("alerta");
  expect(alerta).not.toBeInTheDocument();

  //Crear Cita y comprobar que la función se llame
  expect(crearCita).toHaveBeenCalled();
  expect(crearCita).toHaveBeenCalledTimes(1);
});
