import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import IntervalController from './components/IntervalController.js';
import Timer from './components/Timer.js';
import Footer from './components/Footer.js';

//https://jestjs.io/docs/en/expect
//shallow: https://enzymejs.github.io/enzyme/docs/api/shallow.html
//mount: https://enzymejs.github.io/enzyme/docs/api/mount.html

it('App deeply renders as a smoke test', () => {
  mount(<App />);
});