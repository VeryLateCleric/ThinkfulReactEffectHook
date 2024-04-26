import React, { useEffect, useState } from "react";

function App() {
  const [toDos, setToDos] = useState([]);

  // Load data from https://jsonplaceholder.typicode.com/todos?userId=3
  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/todos?userId=3";
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: abortController.signal});
        const data = await response.json();
        setToDos(data);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort()
    };
  }, []);

  return (
    <div className="App">
      <h1>To Do List</h1>
      <ul className="todo-list">
        {toDos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "",
            }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
