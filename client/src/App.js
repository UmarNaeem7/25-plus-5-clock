import React from 'react';
import './App.css';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(){
    super();
  }

  render(){
    return <div>
      <h1>25 + 5 Clock</h1>
      <Footer />
    </div>;
  }
}

export default App;