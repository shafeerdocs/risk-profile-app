// screens/QuestionnaireScreen.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { questions } from "../types/questions"; // Import the questions
import { SetAnswersAction } from "../redux/actions"; // Redux action
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import Icon from "react-native-vector-icons/Ionicons"; // Import the icon

// Define the navigation prop type
type QuestionnaireScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Questionnaire"
>;
const handlePressIn = (scaleValue: any) => {
  scaleValue.value = withSpring(0.95); // Shrink slightly when pressed
};

const handlePressOut = (scaleValue: any) => {
  scaleValue.value = withSpring(1); // Back to original size when released
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const QuestionnaireScreen: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, { option: string; score: number }>
  >({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation<QuestionnaireScreenNavigationProp>();

  const currentQuestion = questions[currentQuestionIndex];

  // Animation values
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
    <Pressable onPress={handleQuit} style={styles.quitButton}>
        <Icon name="power" size={24} color="red" /> 
      </Pressable>
        </View>
    
      ),
    });

    // Trigger the animations when the question changes
    opacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });
    scale.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });

    // Reset animation on question exit
    return () => {
      opacity.value = 0;
      scale.value = 0.9;
    };
  }, [currentQuestionIndex, opacity, navigation]);

  const handleSelectOption = (option: string, score: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: { option, score },
    }));
  };

  const submitScale = useSharedValue(1);
  const clearScale = useSharedValue(1);

  const submitAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: submitScale.value }],
    };
  });

  const clearAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: clearScale.value }],
    };
  });
  const handleSubmit = () => {
    const totalScore = Object.values(selectedAnswers).reduce(
      (acc, curr) => acc + curr.score,
      0
    );
    dispatch(SetAnswersAction({ answers: selectedAnswers, score: totalScore }));
    navigation.navigate("Result");
  };

  const handleClear = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0); // Reset to the first question
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Handle quitting the app
  const handleQuit = () => {
    BackHandler.exitApp(); // Exit the app
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View style={[styles.questionContainer, animatedStyle]}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          {currentQuestion.options.map((option) => (
            <TouchableOpacity
              key={option.text}
              style={[
                styles.optionButton,
                selectedAnswers[currentQuestion.id]?.option === option.text
                  ? styles.selectedOption
                  : {},
              ]}
              onPress={() => handleSelectOption(option.text, option.score)}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            onPress={handlePrevious}
            style={[
              styles.navButton,
              currentQuestionIndex === 0 && styles.disabled,
            ]}
            disabled={currentQuestionIndex === 0}
          >
            <Text style={styles.navButtonText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNext}
            style={[
              styles.navButton,
              currentQuestionIndex === questions.length - 1 && styles.disabled,
            ]}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            <Text style={styles.navButtonText}>→</Text>
          </TouchableOpacity>
        </View>
        {/* Fixed button container at the bottom */}
        <View style={styles.bottomButtonContainer}>
          <Pressable
            onPress={handleSubmit}
            testID="submit-button"
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </Pressable>
          <Pressable
            onPress={handleClear}
             testID="clear-button"
            style={({ pressed }) => [
              styles.clearButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f4f7',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  fixedButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 80, // Adjust this to make space for the submit and clear buttons
    left: 0,
    right: 0,
  },
  questionContainer: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3f51b5', // Indigo color for question
  },
  optionButton: {
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#90caf9',
    marginVertical: 5,
    backgroundColor: '#e3f2fd', // Light blue for options
  },
  selectedOption: {
    backgroundColor: '#2196f3', // Blue for selected option
    borderColor: '#1976d2',
  },
  optionText: {
    color: '#0d47a1', // Dark blue for text
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  navButton: {
    width: 60, // Set a fixed width
    height: 60, // Set a fixed height
    borderRadius: 30, // Half of width/height for circle
    borderColor: '#3f51b5',
    borderWidth: 2,
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content vertically
    backgroundColor: '#f9f9f9', // Button background color
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
},
  disabled: {
    opacity: 0.5, // Make disabled buttons look faded
  },
  navButtonText: {
    fontSize: 24,
    color: '#3f51b5',
    textAlign: 'center', // Center the text within the button
    lineHeight: 24, // Adjust line height for vertical centering
},
  submitContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f0f4f7',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  submitButton: {
    width: 140,
    paddingVertical: 10,
    backgroundColor: '#8bc34a',
    borderRadius: 20,
    alignItems: 'center',
  },
  clearButton: {
    width: 140,
    paddingVertical: 10,
    backgroundColor: '#ff7043',
    borderRadius: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
  },
  quitButton: {
    padding: 10,
  },
});

export default QuestionnaireScreen;
