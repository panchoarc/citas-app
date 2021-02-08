import App from "../App";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

test("<App /> La Aplicación Funciona bien la primera vez", () => {
  render(<App />);

  expect(screen.getByText("Administrador de Pacientes")).toBeInTheDocument();
  expect(screen.getByTestId("nombre-app").textContent).toBe(
    "Administrador de Pacientes"
  );
  expect(screen.getByTestId("nombre-app").tagName).toBe("H1");

  expect(screen.getByText("No hay citas")).toBeInTheDocument();
  expect(screen.getByText("Crear Cita")).toBeInTheDocument();
});

test("<App /> Agregar una cita y verificar Heading ", () => {
  render(<App />);

  expect(screen.getByText("Administrador de Pacientes")).toBeInTheDocument();
  expect(screen.getByTestId("nombre-app").textContent).toBe(
    "Administrador de Pacientes"
  );

  expect(screen.getByTestId("nombre-app").tagName).toBe("H1");

  expect(screen.getByText("No hay citas")).toBeInTheDocument();
  expect(screen.getByText("Crear Cita")).toBeInTheDocument();

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

  //Revisar el título dinámico

  expect(screen.getByTestId("titulo-dinamico").textContent).toBe(
    "Administra tus Citas"
  );
  expect(screen.getByTestId("titulo-dinamico").textContent).not.toBe(
    "No hay Citas"
  );
});

test("<App /> Verificar citas en el DOM", async () => {
  render(<App />);

  //   const citas = await screen.findAllByTestId("cita");

  expect(screen.getByTestId("btn-eliminar").tagName).toBe("BUTTON");
  expect(screen.getByTestId("btn-eliminar")).toBeInTheDocument();

  //Verificar alguna cita
  expect(screen.getByText("Hook")).toBeInTheDocument();
  //Snapshot crear un archivo para verificar su contenido
  //expect(citas).toMatchSnapshot();
});

test("<App/> Eliminar la Cita", () => {
  render(<App />);

  const btnEliminar = screen.getByTestId("btn-eliminar");
  expect(btnEliminar.tagName).toBe("BUTTON");
  expect(btnEliminar).toBeInTheDocument();

  //Simular click
  userEvent.click(btnEliminar);

  //La cita ya no debe estar en el documento
  expect(btnEliminar).not.toBeInTheDocument();

  expect(screen.queryByText("Hook")).not.toBeInTheDocument();

  expect(screen.queryByTestId("cita")).not.toBeInTheDocument();
});
