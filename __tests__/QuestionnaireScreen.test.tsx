import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStore } from 'redux';
import { createStackNavigator } from '@react-navigation/stack';
import QuestionnaireScreen from '../screens/QuestionnaireScreen';
import ResultScreen from '../screens/ResultScreen';
import rootReducer from '../redux/reducer'; 

const Stack = createStackNavigator();

// Create a Redux store for testing
const store = createStore(rootReducer);

const TestWrapper = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Questionnaire">
          <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

describe('QuestionnaireScreen', () => {
  it('renders correctly and navigates to ResultScreen on submit', async () => {
    const { getByTestId, findByText } = render(<TestWrapper />);
    
   
    const submitButton = getByTestId('submit-button');

    fireEvent.press(submitButton);


    const resultScreenText = await findByText('Your Total Score'); 
    expect(resultScreenText).toBeTruthy();
  });

  it('clears all selected answers and resets the question index when the clear button is pressed', () => {
    const { getByTestId } = render(<TestWrapper />);
    
    
    const clearButton = getByTestId('clear-button');

    // Simulate pressing the clear button
    fireEvent.press(clearButton);
    expect(store.getState().answers.answers).toEqual({});

  });
});
