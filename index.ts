import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });
// 🚫 No eliminar las líneas de arriba ⬆️
// ✍️ Escribe tu código aquí 👇
//const systemName: string = "Android";
//const version: number = 10.0;
//const userName: string = "Junior";cls
//const mensaje: string = systemName + "  v" + version + "¡Bienvenido, " + userName + "!";
//console.log(mensaje);
// Comentario: cuando ejecuto ts-node index.ts para verificar si mi codigo funciona, me sale error, creo que el error es en la compatibilidad de la versión de TypeScript y Node
//const answer = await rl.question("¿Cuál es tu nombre? ");
//console.log(`Hola, ${answer}!`);

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

let tareas: Task[] = [];
let contador = 1;

const saveToDB = (tarea: Task): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Tarea guardada en db");
      resolve();
    }, 2000);
  });
};

const addTask = (title: string) => {
  tareas.push({
    id: contador,
    title: title,
    completed: false,
  });
  contador++;
};

const listTasks = () => {
  const tareasFormateadas = tareas.map((task) => {
    const { id, title, completed } = task;
    const estado = completed ? "completed" : "pending";
    return id + " " + title + " " + estado;
  });

  tareasFormateadas.forEach((tarea) => {
    console.log(tarea);
  });
};

const removeTask = () => {
  const eliminada = tareas.pop();
  if (eliminada) {
    console.log("Tarea " + eliminada.title + " eliminada");
  } else {
    console.log("No hay tareas");
  }
};

const markCompleted = (id: number) => {
  const tarea = tareas.find((tarea) => tarea.id === id);
  if (tarea) {
    tarea.completed = true;
  }
};
const filterPending = () => {
  return tareas.filter((tarea) => tarea.completed === false);
};
const filterCompleted = () => {
  return tareas.filter((tarea) => tarea.completed === true);
};

let opcion = "";

while (opcion !== "7") {
  console.log("1 Agregar tarea");
  console.log("2 Eliminar ultima tarea");
  console.log("3 Lista de tareas");
  console.log("4 markCompleted");
  console.log("5 Tareas pendientes");
  console.log("6 Tareas completadas");
  console.log("7 Salir");

  opcion = await rl.question("Ingrese una opción ");

  switch (opcion) {
    case "1":
      const titulo = await rl.question("Ingresa una tarea: ");
      addTask(titulo);
      console.log("Tarea agregada");
      break;

    case "2":
      removeTask();
      break;

    case "3":
      listTasks();
      break;

    case "4":
      const id = await rl.question("Ingresa el id de la tarea: ");
      markCompleted(Number(id));
      console.log("Tarea completada");
      break;

    case "5":
      const pendientes = filterPending();

      pendientes.forEach((tarea) => {
        console.log(tarea.id + " " + tarea.title + " pending");
      });

      break;

    case "6":
      const completadas = filterCompleted();

      completadas.forEach((tarea) => {
        console.log(tarea.id + " " + tarea.title + " completed");
      });

      break;

    case "7":
      console.log("Saliendo");
      break;
  }
}

// 🚫 No eliminar las líneas de abajo ⬇️
rl.close();
