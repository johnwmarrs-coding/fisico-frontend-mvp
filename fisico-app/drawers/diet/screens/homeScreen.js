import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView} from 'react-native';
import {DarkModeColors, LightModeColors} from '../../../styles/colors';
import { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Title, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AppDataContext from '../../../contexts/appDataContext';
import { FISICO_URL } from '../../../utils/urls';
import { GenderOptions, GoalOptions, calculate_calories, calculate_bmi, HeightUnitOptions, WeightOptions } from '../../../utils/dietUtils';



const HomeScreen = ( {navigation} ) => {
  const appDataContext = useContext(AppDataContext);
  const [age, setAge] = useState(null);
  const [weight, setWeight] = useState(null);
  const [weightUnit, setWeightUnit] = useState(WeightOptions[0]);
  const [height, setHeight] = useState(null);
  const [feet, setFeet] = useState('0');
  const [inches, setInches] = useState('0');
  const [heightUnit, setHeightUnit] = useState(HeightUnitOptions[0]);
  const [gender, setGender] = useState('f');
  const [goal, setGoal] = useState('none');
  const [recommendedCalories, setRecommendedCalories] = useState(null);
  const [bmi, setBMI] = useState(null);

  const process_stats = () => {
    var ageInt = 0;
    var heightCM = 0;
    var weightKG = 0;

    if (heightUnit == 'ft & in') {
      heightCM = 30.48 * (parseFloat(feet) + parseFloat(inches) / 12.0);
    }else {
      heightCM = parseFloat(height);
    }

    if (weightUnit == 'lbs') {
      weightKG = 0.453592 * parseFloat(weight);
    }else {
      weightKG = parseFloat(weight);
    }

    ageInt = parseFloat(age);
    console.log(heightCM);
    console.log(weightKG);

    setRecommendedCalories(calculate_calories(ageInt, weightKG, heightCM, gender, goal));
    setBMI(calculate_bmi(weightKG, heightCM));

  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Age</Text>
      <TextInput
        placeholder='age'
        onChangeText={text => setAge(text)}
        value={age}
        style={styles.field}
      />
      <Text style={styles.label}>Gender</Text>
      <Picker 
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        style={{width: '100%'}}
      >
        {GenderOptions.map((item, key) => (
          <Picker.Item key={key} label={item} value={item}/>
            )
        )}
      </Picker>

      <Text style={styles.label}>Goal</Text>
      <Picker 
        selectedValue={goal}
        onValueChange={(itemValue, itemIndex) => setGoal(itemValue)}
        style={{width: '100%'}}
      >
        {GoalOptions.map((item, key) => (
          <Picker.Item key={key} label={item} value={item}/>
            )
        )}
      </Picker>

      <Text style={styles.label}>Height</Text>
      <Picker 
        selectedValue={heightUnit}
        onValueChange={(itemValue, itemIndex) => setHeightUnit(itemValue)}
        style={{width: '100%'}}
      >
        {HeightUnitOptions.map((item, key) => (
          <Picker.Item key={key} label={item} value={item}/>
            )
        )}
      </Picker>
      {heightUnit == 'ft & in' ?
      <View style={styles.row}>
        <TextInput
          placeholder='feet'
          onChangeText={text => setFeet(text)}
          value={feet}
          style={styles.smallField}
        />
        <Text style={styles.label}>ft</Text>
        <TextInput
          placeholder='inches'
          onChangeText={text => setInches(text)}
          value={inches}
          style={styles.smallField}
        />
        <Text style={styles.label}>in</Text>
      </View>
      :
      <View>
        <TextInput
          placeholder='centimeters'
          onChangeText={text => setHeight(text)}
          value={height}
          style={styles.field}
        />
      </View>
      }
      <Text style={styles.label}>Weight</Text>
      <Picker 
        selectedValue={weightUnit}
        onValueChange={(itemValue, itemIndex) => weightUnit(itemValue)}
        style={{width: '100%'}}
      >
        {WeightOptions.map((item, key) => (
          <Picker.Item key={key} label={item} value={item}/>
            )
        )}
      </Picker>
      <TextInput
          placeholder='weight'
          onChangeText={text => setWeight(text)}
          value={weight}
          style={styles.field}
        />
      <Button 
        mode='contained'
        style={styles.button} 
        onPress={process_stats}
        disabled={isNaN(parseFloat(age)) || isNaN(parseInt(feet)) && heightUnit == 'ft & in' || isNaN(parseFloat(inches)) && heightUnit == 'ft & in'|| isNaN(height) && heightUnit == 'cm' || isNaN(weight) ? true : false}>
          Calculate
      </Button>
      {recommendedCalories != null ?
        <Text style={[styles.label, {alignSelf: 'center'}]}>Recommended Calories Per Day: {Math.round(recommendedCalories)}</Text>
      :
      null
      }
      {bmi != null ?
        <Text style={[styles.label, {alignSelf: 'center'}]}>Your BMI: {Math.round(bmi * 10)/10}</Text>
      :
      null
      }
    </ScrollView>
  )
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    margin: 5,
    backgroundColor: LightModeColors.Content,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center'
  }, 
  smallField: {
    width: 100,
    padding: 5,
    backgroundColor: LightModeColors.FieldBackground,
    color: LightModeColors.FieldForeground,
  },
  field: {
    marginVertical: 5,
    padding: 5,
    backgroundColor: LightModeColors.FieldBackground,
    color: LightModeColors.FieldForeground,
  },
  label: {
    color: LightModeColors.ContentForeground,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'center',
    width: '100%'
  },
})
export default HomeScreen;