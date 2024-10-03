// jest.setup.js
import '@testing-library/jest-native/extend-expect';
global.setImmediate = (fn) => {
    return setTimeout(fn, 0);
  };
  