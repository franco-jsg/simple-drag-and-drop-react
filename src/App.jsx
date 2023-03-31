import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const App = () => {

  const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
    { id: 1, text: "Aprender React" },
    { id: 2, text: "Aprender JS" },
    { id: 3, text: "Aprender Vue" },
  ];

  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))

  }, [todos])

  const handleOrder = (result) => {
    if(!result.destination) return // esto es para evitar que se nos rompa todo por tirarlo fuera del lugar permitido.
    const startIndex = result.source.index
    const endIndex = result.destination.index

    const copyArray = [...todos]
    const [reorderedItem] =  copyArray.splice(startIndex, 1) // los [] es para hacer el desestructurado del array y que nos devuelva el objeto solamente.

    copyArray.splice(endIndex, 0, reorderedItem)

    // console.log(copyArray)

    setTodos(copyArray)
  }

  return (
    <DragDropContext onDragEnd={handleOrder}>
      <h1>Todo App</h1>
      <Droppable droppableId="todos">
        {(droppableProvider) => (
          <ul
            ref={droppableProvider.innerRef}
            {...droppableProvider.droppableProps}
          >
            {todos.map((todo, index) => (
              <Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>
                {(draggableProvider) => (
                  <li ref={draggableProvider.innerRef} {...draggableProvider.draggableProps} {...draggableProvider.dragHandleProps}>{todo.text}</li>
                )}
              </Draggable>
            ))}
            {droppableProvider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
