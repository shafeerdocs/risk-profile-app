import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useSelector } from 'react-redux';


const calculateRiskCategory = (totalScore: any): string => {
  if (totalScore <= 5) {
    return "Low Risk";
  } else if (totalScore <= 10) {
    return "Medium Risk";
  } else {
    return "High Risk";
  }
};

const ResultScreen: React.FC = () => {
  const answers = useSelector((state: any) => state.answers.answers);
  const scores = useSelector((state: any) => state.answers.score);
  const totalScore = scores;
  const riskCategory = calculateRiskCategory(totalScore);

  const { text: riskProfile, color: riskColor } = getRiskProfile(totalScore);

 // Blink animation
 const animatedValue = new Animated.Value(0);

 const startBlinkAnimation = () => {
   animatedValue.setValue(0);
   Animated.loop(
     Animated.sequence([
       Animated.timing(animatedValue, {
         toValue: 1,
         duration: 500,
         useNativeDriver: true,
       }),
       Animated.timing(animatedValue, {
         toValue: 0,
         duration: 500,
         useNativeDriver: true,
       }),
     ])
   ).start();
 };

 React.useEffect(() => {
   startBlinkAnimation(); // Start blinking animation
 }, []);

 const blinkStyle = {
   opacity: animatedValue,
 };

 return (
    <View style={styles.container} testID="result-screen">
    <Text style={styles.title}>Your Total Score</Text>
    <View style={[styles.circle, { backgroundColor: riskColor }]}>
      <Text style={styles.score}>{String(totalScore)}</Text>
    </View>
    <Text style={styles.riskTitle}>Risk Profile</Text>
    <Animated.Text style={[styles.riskProfile, blinkStyle, { color: riskColor }]}>
    {riskProfile ?? "Unknown Risk"}
    </Animated.Text>
  </View>
 );
};

// Function to determine risk profile based on score
const getRiskProfile = (score: number): { text: string; color: string } => {
    if (score <= 3) return { text: "Low Risk", color: '#4CAF50' }; // Green
    if (score <= 6) return { text: "Medium Risk", color: '#FFEB3B' }; // Yellow
    return { text: "High Risk", color: '#F44336' }; // Red
  };
const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#f9f9f9',
 },
 title: {
   fontSize: 24,
   fontWeight: 'bold',
   marginBottom: 20,
 },
 circle: {
   width: 100,
   height: 100,
   borderRadius: 50,
   backgroundColor: '#4CAF50', // Change color based on score
   justifyContent: 'center',
   alignItems: 'center',
   marginBottom: 20,
 },
 score: {
   fontSize: 36,
   fontWeight: 'bold',
   color: '#fff',
 },
 riskTitle: {
   fontSize: 20,
   fontWeight: 'bold',
   marginBottom: 10,
 },
 riskProfile: {
   fontSize: 24,
   fontWeight: 'bold',
   color: '#FF5722', // Default color; change based on risk profile
 },
});

export default ResultScreen;