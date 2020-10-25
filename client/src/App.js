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
    this.intervalController = this.intervalController.bind(this);
  }

  intervalController(event){
    const buttonElementId = event.target.id;
    const indexOfIdDash = buttonElementId.indexOf('-');
    const intervalType = buttonElementId.substring(0, indexOfIdDash);
    const intervals = {...this.state.intervals};
    if(intervals[intervalType] === 1 || intervals[intervalType] === 60){
      return;
    }
    
    const intervalDirection = buttonElementId.substring(indexOfIdDash + 1);
    if(intervalDirection === 'increment'){
      intervals[intervalType]++;
    } else {
      intervals[intervalType]--;
    }
    if(intervals[intervalType] > 0 && intervals[intervalType] < 61){
    }
    this.setState({intervals});
  }
  
  render(){
    return <div>
      <h1>25 + 5 Clock</h1>
      {this.intervalTypes.map(type => <IntervalController type={type} length={this.state.intervals[type]} intervalController={this.intervalController}/>)}
      <Timer interval={this.state.isSession ? this.intervalTypes[1]: this.intervalTypes[0]} />
      <Footer />
    </div>;
  }
}

export default App;