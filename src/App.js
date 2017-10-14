import React, { Component } from 'react';
import TodoList from "./Components/TodoList";

class App extends Component {
  render() {
    return (
      <div className="app">
          <h1>To-do list app</h1>
        <TodoList/>
      </div>
    );
  }
}

export default App;
