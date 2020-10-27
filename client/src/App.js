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
      time: '25:00'
    }
    this.intervalTypes = Object.keys(this.state.intervals);
    this.handleChange = this.handleChange.bind(this);
    this.countDown = this.countDown.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleChange(event){
    const buttonElementId = event.target.id;
    const [intervalType, intervalDirection] = buttonElementId.split('-');
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

  leftPad(value){
    if(value > 9){
      return value + '';
    } else {
      return '0' + value;
    }
  }
  
  //TODO: Need to toggle and reset between session and break, and stop timer from the point the time was paused
  countDown(){
    let minutes = this.state.isSession ? this.state.intervals.session : this.state.intervals.break;
    this.setState({time: `${this.leftPad(minutes)}:00`});
    let seconds = 59;
    minutes--;
    
    const interval = setInterval(() => {
      this.setState({time: `${this.leftPad(minutes)}:${this.leftPad(seconds)}`});
      seconds--;
      if(seconds < 0){
        if(minutes > 0){
          seconds = 59;
          minutes--;
        } else {
          clearInterval(interval);
          this.setState({isSession: !this.state.isSession})
        }
      }
    }, 1000);
  }

  //TODO: When I click the element with the id of "reset", any running timer should be stopped and the element with id="time-left" should reset to its default state.
  reset(){
    this.setState({
      intervals: {
        break: 5,
        session: 25
      }
    });
  }
  
  render(){
    return <div>
      <h1>25 + 5 Clock</h1>
      {this.intervalTypes.map(type => <IntervalController key={type} type={type} length={this.state.intervals[type]} handleChange={this.handleChange}/>)}
      <Timer interval={this.state.isSession ? this.intervalTypes[1]: this.intervalTypes[0]} reset={this.reset} time={this.state.time} start={this.countDown}/>
      <Footer />
    </div>;
  }
}

export default App;