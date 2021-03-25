import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LightModeColors, DarkModeColors } from '../../../../styles/colors';
import Workout from '../../workout';
import ThemeContext from '../../../../contexts/themeContext';
import {WorkoutTypes, WorkoutFields, LiftFields, DistanceFields, CommonLifts, DetailTypes, DistanceUnits, WeightUnits} from '../../../../utils/workoutTypes';
import DurationPicker from 'react-duration-picker';

const LogWorkoutScreen = ( {navigation}) => {
  const themeContext = useContext(ThemeContext);

  const [workoutType, setWorkoutType] = useState('Distance');
  const [workoutName, setWorkoutName] = useState(null);
  const [workoutDescription, setWorkoutDescription] = useState(null);
  const [workoutDate, setWorkoutDate] = useState(null);

  const [workoutResults, setWorkoutResults] = useState([]);
  const [workoutDetailType, setWorkoutDetailType] = useState('Distance');
  const [workoutDetailName, setWorkoutDetailName] = useState(null);
  const [workoutDetailDistance, setWorkoutDetailDistance] = useState(null);
  const [workoutDetailUnits, setWorkoutDetailUnits] = useState(null);
  const [workoutDetailDuration, setWorkoutDetailDuration] = useState(null);
  const [workoutDetailNumSets, setWorkoutDetailNumSets] = useState(null);
  const [workoutDetailNumReps, setWorkoutDetailNumReps] = useState(null);
  const [workoutDetailWeight, setWorkoutDetailWeight] = useState(null);
  const [tempWorkoutResult, setTempWorkoutResult] = useState({});

  const [entryState, setEntryState] = useState(0);

    switch (entryState){
        case 0:
            return (
                <View>
                    <Text>Workout Overview</Text>
                    <Text>Workout Name</Text>
                    <TextInput
                        placeholder='name'
                        onChangeText={text => setWorkoutName(text)}
                        value={workoutName}
                    />
                    <Text>Workout Description</Text>
                    <TextInput
                        placeholder='description'
                        onChangeText={text => setWorkoutDescription(text)}
                        value={workoutDescription}
                    />
                    <Text>Workout Type</Text>
                    <Picker 
                        selectedValue={workoutType}
                        onValueChange={(itemValue, itemIndex) => setWorkoutType(itemValue)}
                    >
                        {WorkoutTypes.map((item, key) => (
                            <Picker.Item key={key} label={item} value={item}/>
                            )
                        )}
                    </Picker>
                    <Button
                        title='Cancel'
                        onPress={navigation.goBack}
                    />
                    <Button
                        title='Next'
                        onPress={() => {
                                if (workoutType == 'Distance'){
                                    setWorkoutDetailType('Distance');
                                    setWorkoutDetailUnits(DistanceUnits[0]);
                                }else if (workoutType == 'Weight Lifting'){
                                    setWorkoutDetailType('Lift');
                                    setWorkoutDetailUnits(WeightUnits[0]);
                                }else {

                                }
                                setEntryState(entryState + 1); 
                            }
                        }
                    />
                </View>
            )
            break;
        case 1:
            return (
                <View>
                    {workoutResults.map((item, key) => (
                        <Text>{JSON.stringify(item)}</Text>
                        )
                     )}
                    <Text>Workout Details</Text>
                    <Picker 
                        selectedValue={workoutDetailType}
                        onValueChange={(itemValue, itemIndex) => setWorkoutDetailType(itemValue)}
                    >
                        {DetailTypes.map((item, key) => (
                            <Picker.Item key={key} label={item} value={item}/>
                            )
                        )}
                    </Picker>
                    <Text>Name</Text>
                    <TextInput
                        placeholder='name'
                        onChangeText={text => setWorkoutDetailName(text)}
                        value={workoutDetailName}
                    />
                    { workoutDetailType == 'Distance' ?
                        <View>
                            <Text>Distance</Text>
                            <TextInput
                                placeholder='Distance'
                                onChangeText={text => setWorkoutDetailDistance(text)}
                                value={workoutDetailDistance}
                            />
                            <Text>Units</Text>
                            <Picker 
                                selectedValue={workoutDetailUnits}
                                onValueChange={(itemValue, itemIndex) => setWorkoutDetailUnits(itemValue)}
                                >
                                {DistanceUnits.map((item, key) => (
                                    <Picker.Item key={key} label={item} value={item}/>
                                    )
                                )}
                            </Picker>
                            <Text>Time (h:m:s)</Text>
                            <TextInput
                                placeholder='Duration'
                                onChangeText={text => setWorkoutDetailDuration(text)}
                                value={workoutDetailDuration}
                            />
                            
                            
                        </View>
                        : 
                        <View>
                            <Text>Weight</Text>
                            <TextInput
                                placeholder='Weight'
                                onChangeText={text => setWorkoutDetailWeight(text)}
                                value={workoutDetailWeight}
                            />
                            <Text>Units</Text>
                            <Picker 
                                selectedValue={workoutDetailUnits}
                                onValueChange={(itemValue, itemIndex) => setWorkoutDetailUnits(itemValue)}
                                >
                                {WeightUnits.map((item, key) => (
                                    <Picker.Item key={key} label={item} value={item}/>
                                    )
                                )}
                            </Picker>
                            <Text>Sets</Text>
                            <TextInput
                                placeholder='Sets'
                                onChangeText={text => setWorkoutDetailNumSets(text)}
                                value={workoutDetailDuration}
                            />
                            <Text>Reps</Text>
                            <TextInput
                                placeholder='Reps'
                                onChangeText={text => setWorkoutDetailNumReps(text)}
                                value={workoutDetailDuration}
                            />
                            
                            
                        </View>
                        
                    }
                    <Button
                        title='Add'
                        onPress={() => {
                                let result = {};
                                if (workoutDetailType == 'Distance'){
                                    result = {
                                        name: workoutDetailName,
                                        distance: workoutDetailDistance,
                                        units: workoutDetailUnits,
                                        duration: workoutDetailDuration,
                                    }
                                    let tempResults = workoutResults;
                                    tempResults.push(result);
                                    setTempWorkoutResult({});
                                    setWorkoutResults(tempResults);
                                } else if (workoutDetailType == 'Lift'){
                                    result = {
                                        name: workoutDetailName,
                                        distance: workoutDetailWeight,
                                        units: workoutDetailUnits,
                                        num_sets: workoutDetailNumSets,
                                        num_reps: workoutDetailNumReps,
                                    }
                                    let tempResults = workoutResults;
                                    tempResults.push(result);
                                    setTempWorkoutResult({});
                                    setWorkoutResults(tempResults);
                                }
                                
                                if (workoutType == 'Distance'){
                                    setWorkoutDetailType('Distance');
                                    setWorkoutDetailUnits(DistanceUnits[0]);
                                }else if (workoutType == 'Weight Lifting'){
                                    setWorkoutDetailType('Lift');
                                    setWorkoutDetailUnits(WeightUnits[0]);
                                }else {

                                }
                            }
                        }
                    />
                    <Button
                        title='Previous'
                        onPress={() => setEntryState(entryState - 1)}
                    />
                    <Button
                        title='Next'
                        onPress={() => setEntryState(entryState + 1)}
                    />
                </View>
            )
            break;
        default:
            return (<View></View>)
            break;
    }
  
}

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: DarkModeColors.MenuBackground
  },
  label: {
    color: DarkModeColors.ContentForeground,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: LightModeColors.ContentBackground
  },
  label: {
    color: LightModeColors.ContentForeground,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default LogWorkoutScreen;