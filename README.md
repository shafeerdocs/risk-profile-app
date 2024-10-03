# Risk Assessment App

This is a React Native application built with Expo, designed to assess the user's risk profile based on their responses to a set of questions. The app employs Redux for state management and utilizes stack navigation for a seamless user experience.

## Getting Started

To run the application on your preferred platform, use the following commands:

- **Start the development server**: 
  ```bash
  npm start


Run on Android:
npm run android

Run on iOS:
npm run ios

Run on Web:
npm run web

Run tests with coverage:
npm run test

Project Overview
The project took approximately one day to set up due to the latest React Native and Gradle configuration on the system.

Features
State Management: The application uses Redux to manage the state of the selected answers, which persist across different screens.

Submission and Navigation: The submit button is always active; upon clicking, it navigates to the result screen that displays the risk assessment results based on user input.

Dynamic Questioning: The questions are stored in a structured format, allowing for easy addition of new questions simply by updating the data source.

Testing: The _test_ folder contains the test data, and the test scripts utilize the Jest framework to ensure code quality and coverage.

Folder Structure
The project follows a simple folder structure:

screens: Contains the QuestionnaireScreen and ResultScreen.

redux: Contains the store, action, and reducer files.

Application Behavior
Clear Button: When the clear button is pressed, it resets all selected answers and the question index back to 0.

Submit Button: The submit button takes the user to the ResultScreen based on their selected scores. The risk category (Low, Medium, High) is determined by the total score derived from the user's answers.

Dynamic Risk Profile Calculation: The app calculates the risk category based on the total score using a defined set of thresholds.

Testing and Coverage
The app includes tests to ensure maximum coverage, validating that:

Questionnaire Screen:

The submit button changes the screen to the ResultScreen upon submission.
The clear button clears all selected answers and resets the question index to 0.
Result Screen:

Displays the correct risk category based on the selected score.
Conclusion
This application serves as a basic risk assessment tool and is extendable. Feel free to contribute by adding more questions or enhancing the user interface. The structure and state management provide a solid foundation for future enhancements and features.

Acknowledgments
This project is built using Expo for rapid development and testing.
Navigation is managed using React Navigation for an intuitive user experience.
Testing is facilitated by Jest to ensure reliability and code quality.