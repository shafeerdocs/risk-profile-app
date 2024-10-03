import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ResultScreen from '../screens/ResultScreen'; 
import reducer from '../redux/reducer'; 

const store = createStore(reducer);

describe('ResultScreen', () => {
  it('renders correctly based on the selected score', () => {
    store.dispatch({
      type: 'SET_ANSWERS',
      payload: { answers: {}, score: 4 }, 
    });

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <ResultScreen />
      </Provider>
    );

    expect(getByText('Your Total Score')).toBeTruthy();
    expect(getByText('Low Risk')).toBeTruthy();
    expect(getByTestId('result-screen')).toBeTruthy();
  });

  it('renders correctly with a medium risk based on the selected score', () => {
    store.dispatch({
      type: 'SET_ANSWERS',
      payload: { answers: {}, score: 7 }, 
    });

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <ResultScreen />
      </Provider>
    );

    expect(getByText('Your Total Score')).toBeTruthy();
    expect(getByText('Medium Risk')).toBeTruthy();
    expect(getByTestId('result-screen')).toBeTruthy();
  });

  it('renders correctly with high risk based on the selected score', () => {
    store.dispatch({
      type: 'SET_ANSWERS',
      payload: { answers: {}, score: 11 }, 
    });

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <ResultScreen />
      </Provider>
    );

    expect(getByText('Your Total Score')).toBeTruthy();
    expect(getByText('High Risk')).toBeTruthy();
    expect(getByTestId('result-screen')).toBeTruthy();
  });
});
