import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import IntervalController from './components/IntervalController.js';
import Timer from './components/Timer.js';
import Footer from './components/Footer.js';

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