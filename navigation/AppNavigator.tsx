// navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuestionnaireScreen from '../screens/QuestionnaireScreen';
import ResultScreen from '../screens/ResultScreen';
import { RootStackParamList } from '../types/navigation'; 

const Stack = createStackNavigator<RootStackParamList>(); 

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
            <Stack.Navigator initialRouteName="Questionnaire"
        screenOptions={{
          headerStyle: { backgroundColor: '#0e2140' }, 
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
