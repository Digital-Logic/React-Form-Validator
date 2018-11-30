import React, { Component } from 'react';
import './App.css';
import BasicForm from './Components/BasicForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <BasicForm />
        </header>
      </div>
    );
  }
}

export default App;
