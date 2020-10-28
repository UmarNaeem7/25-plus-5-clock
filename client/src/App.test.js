import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import IntervalController from './components/IntervalController.js';
import Timer from './components/Timer.js';

//https://jestjs.io/docs/en/expect
//shallow: https://enzymejs.github.io/enzyme/docs/api/shallow.html
//mount: https://enzymejs.github.io/enzyme/docs/api/mount.html

const INITIAL_STATE =  {
  intervals: {
    break: 5,
    session: 25
  },
  isSession: true,
  isPaused: true,
  pausedTime: null,
  time: '25:00',
};
const INTERVAL_TYPES = Object.keys(INITIAL_STATE.intervals);
const BUTTON_ID_DIRECTIONS = ['decrement', 'increment'];

it('App deeply renders as a smoke test', () => {
  mount(<App />);
});

it('renders App class child components, and initializes their props', () => {
  const app = shallow(<App />);
  
  const intervalController = app.find('IntervalController');
  expect(intervalController.exists()).toEqual(true);
  expect(intervalController).toHaveLength(INTERVAL_TYPES.length);
  intervalController.forEach((controller, i) => {
    expect(controller.prop('type')).toEqual(INTERVAL_TYPES[i]);
    expect(controller.prop('length')).toEqual(INITIAL_STATE.intervals[INTERVAL_TYPES[i]]);
    expect(controller.prop('handleChange')).toBeDefined();
  });
  
  const timer = app.find('Timer');
  expect(timer.exists()).toEqual(true);
  expect(timer.prop('interval')).toEqual(INTERVAL_TYPES[1]);
  expect(timer.prop('reset')).toBeDefined();
  expect(timer.prop('time')).toEqual(INITIAL_STATE.time);
  expect(timer.prop('start')).toBeDefined();
  expect(timer.prop('isPaused')).toEqual(INITIAL_STATE.isPaused);
  expect(timer.prop('pause')).toBeDefined();
  
  const footer = app.find('Footer');
  expect(footer.exists()).toEqual(true);
});

it('renders an IntervalController component with a valid interval break length', () => {
  const breakType = INTERVAL_TYPES[0];
  const breakLength = INITIAL_STATE.intervals[breakType];
  const intervalController = shallow(<IntervalController type={breakType} length={breakLength} />);
  
  const h2 = intervalController.find('h2');
  expect(h2.prop('id')).toEqual(`${breakType}-label`);
  expect(h2.text()).toEqual(breakType);
  
  const buttons = intervalController.find('button');
  buttons.forEach((button, i) => {
    expect(button.prop('id')).toEqual(`${breakType}-${BUTTON_ID_DIRECTIONS[i]}`);
  });

  const p = intervalController.find('p');
  expect(p.prop('id')).toEqual(`${breakType}-length`);
  expect(p.text()).toEqual(`${breakLength}`);
});

it('renders an IntervalController component with a valid interval session length', () => {
  const sessionType = INTERVAL_TYPES[1];
  const sessionLength = INITIAL_STATE.intervals[sessionType];
  const intervalController = shallow(<IntervalController type={sessionType} length={sessionLength} />);
  
  const h2 = intervalController.find('h2');
  expect(h2.prop('id')).toEqual(`${sessionType}-label`);
  expect(h2.text()).toEqual(sessionType);
  
  const buttons = intervalController.find('button');
  buttons.forEach((button, i) => {
    expect(button.prop('id')).toEqual(`${sessionType}-${BUTTON_ID_DIRECTIONS[i]}`);
  });

  const p = intervalController.find('p');
  expect(p.prop('id')).toEqual(`${sessionType}-length`);
  expect(p.text()).toEqual(`${sessionLength}`);
});

it('calls method handleChange() onClick with the IntervalController component decrement and increment buttons', () => {
  const handleChange = jest.fn();
  const intervalController = shallow(<IntervalController handleChange={handleChange} />);
  const buttons = intervalController.find('button');
  buttons.forEach(button => {
    button.simulate('click');
  });
  expect(handleChange.mock.calls.length).toEqual(buttons.length);
});

it('renders a Timer component with an h2 set to session, a p set to initial session time, and start() prop method called', () => {
  const start = jest.fn();
  const timer = shallow(<Timer interval={INTERVAL_TYPES[1]} time={INITIAL_STATE.time} isPaused={true} start={start}/>);
  
  const h2 = timer.find('h2');
  expect(h2.text()).toEqual(INTERVAL_TYPES[1]);
  
  const p = timer.find('p');
  expect(p.text()).toEqual(INITIAL_STATE.time);

  const startStopButton = timer.find('#start_stop');
  startStopButton.simulate('click');
  expect(start).toHaveBeenCalled();
});