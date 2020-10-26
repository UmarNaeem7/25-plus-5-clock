import React from 'react';
import './App.css';
import IntervalController from './components/IntervalController.js';
import Timer from './components/Timer.js';
import Footer from './components/Footer.js';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      intervals: {
        break: 5,
        session: 25
      },
      isSession: true,
    }
    this.intervalTypes = Object.keys(this.state.intervals);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleChange(event){
    const buttonElementId = event.target.id;
    const indexOfIdDash = buttonElementId.indexOf('-');
    const intervalType = buttonElementId.substring(0, indexOfIdDash);
    const intervalDirection = buttonElementId.substring(indexOfIdDash + 1);
    const intervals = {...this.state.intervals};
    
    if(intervalDirection === 'increment'){
      intervals[intervalType]++;
    } else {
      intervals[intervalType]--;
    }
    if(intervals[intervalType] >= 1 && intervals[intervalType] <= 60){
      this.setState({intervals});
    }
  }

  //TODO: When I click the element with the id of "reset", any running timer should be stopped and the element with id="time-left" should reset to its default state.
  reset(){
    this.setState({intervals: {
      break: 5,
      session: 25
    }});
  }
  
  render(){
    return <div>
      <h1>25 + 5 Clock</h1>
      {this.intervalTypes.map(type => <IntervalController key={type} type={type} length={this.state.intervals[type]} handleChange={this.handleChange}/>)}
      <Timer interval={this.state.isSession ? this.intervalTypes[1]: this.intervalTypes[0]} reset={this.reset}/>
      <Footer />
    </div>;
  }
}

export default App;