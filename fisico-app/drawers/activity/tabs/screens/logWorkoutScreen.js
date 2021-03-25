import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { LightModeColors, DarkModeColors } from '../../../../styles/colors';
import Workout from '../../workout';
import ThemeContext from '../../../../contexts/themeContext';
import {WorkoutTypes, WorkoutFields, LiftFields, DistanceFields, CommonLifts, DetailTypes, DistanceUnits, WeightUnits} from '../../../../utils/workoutTypes';

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

  const [proposedWorkout, setProposedWorkout] = useState(null);

  const [entryState, setEntryState] = useState(0);

  return (
      <View style={themeContext.darkMode? stylesDark.container : styles.container}>
          {entryState == 0 ?
            <View>
                <Text style={themeContext.darkMode? stylesDark.label : styles.label}>Workout Overview</Text>
                <TextInput
                    placeholder='workout name'
                    onChangeText={text => setWorkoutName(text)}
                    value={workoutName}
                    style={themeContext.darkMode? stylesDark.field : styles.field}
                />
                <TextInput
                    placeholder='description'
                    onChangeText={text => setWorkoutDescription(text)}
                    value={workoutDescription}
                    style={themeContext.darkMode? stylesDark.field : styles.field}
                />
                <Picker 
                    selectedValue={workoutType}
                    onValueChange={(itemValue, itemIndex) => setWorkoutType(itemValue)}
                >
                    {WorkoutTypes.map((item, key) => (
                        <Picker.Item key={key} label={item} value={item}/>
                        )
                    )}
                </Picker>
                <View style={styles.row}>
                    <Button
                        mode='contained'
                        style={themeContext.darkMode? stylesDark.button : styles.button}
                        onPress={navigation.goBack}
                    >Cancel</Button>
                    <Button
                        style={themeContext.darkMode? stylesDark.button : styles.button}
                        mode='contained'
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
                    >Next</Button>
                </View>
            </View>
        
            : null
          }
        {entryState == 1 ?
            <View>
            {workoutResults.map((item, key) => (
                <Text>{JSON.stringify(item)}</Text>
                )
            )}
            <Text>Detail Type</Text>
            <Picker 
                selectedValue={workoutDetailType}
                onValueChange={(itemValue, itemIndex) => setWorkoutDetailType(itemValue)}
            >
                {DetailTypes.map((item, key) => (
                    <Picker.Item key={key} label={item} value={item}/>
                    )
                )}
            </Picker>
            <TextInput
                placeholder='name'
                onChangeText={text => setWorkoutDetailName(text)}
                value={workoutDetailName}
                style={themeContext.darkMode? stylesDark.field : styles.field}
            />
            { workoutDetailType == 'Distance' ?
                <View>
                    <TextInput
                        placeholder='Distance'
                        onChangeText={text => setWorkoutDetailDistance(text)}
                        value={workoutDetailDistance}
                        style={themeContext.darkMode? stylesDark.field : styles.field}
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
                    <TextInput
                        placeholder='Duration (h:m:s)'
                        onChangeText={text => setWorkoutDetailDuration(text)}
                        value={workoutDetailDuration}
                        style={themeContext.darkMode? stylesDark.field : styles.field}
                    />
                    
                    
                </View>
                : 
                <View>
                    <TextInput
                        placeholder='Weight'
                        onChangeText={text => setWorkoutDetailWeight(text)}
                        value={workoutDetailWeight}
                        style={themeContext.darkMode? stylesDark.field : styles.field}
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
                    <TextInput
                        placeholder='Sets'
                        onChangeText={text => setWorkoutDetailNumSets(text)}
                        value={workoutDetailDuration}
                        style={themeContext.darkMode? stylesDark.field : styles.field}
                    />
                    <TextInput
                        placeholder='Reps'
                        onChangeText={text => setWorkoutDetailNumReps(text)}
                        value={workoutDetailDuration}
                        style={themeContext.darkMode? stylesDark.field : styles.field}
                    />
                    
                    
                </View>
                
            }
            <View style={styles.row}>
                <Button
                    mode='contained'
                    style={themeContext.darkMode? stylesDark.button : styles.button}
                    onPress={() => setEntryState(entryState - 1)}
                >Previous</Button>
                <Button
                    mode='contained'
                    style={themeContext.darkMode? stylesDark.button : styles.button}
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
                >Add</Button>
                <Button
                    mode='contained'
                    style={themeContext.darkMode? stylesDark.button : styles.button}
                    onPress={() => {
                            let newWorkout = {
                                name: workoutName,
                                workout_type: workoutType,
                                date: Date(),
                                start_time: null,
                                completed: true,
                                plan: [],
                                results: workoutResults

                            }
                            setProposedWorkout(newWorkout);
                            setEntryState(entryState + 1);
                        }
                    }
                >Next</Button>
            </View>
        </View>
        : null
        }
        {entryState == 2 ?
        <View>
            <Text>Does this look right?</Text>
            <Text>{JSON.stringify(proposedWorkout)}</Text>
            <View style={styles.row}>
                <Button
                    mode='contained'
                    style={themeContext.darkMode? stylesDark.button : styles.button}
                    onPress={() => setEntryState(entryState - 1)}
                >Nope</Button>
                <Button
                    mode='contained'
                    style={themeContext.darkMode? stylesDark.button : styles.button}
                    onPress={() => {
                        console.log('SAVE WORKOUT');
                        console.log(JSON.stringify(proposedWorkout));
                        navigation.goBack();
                    }}
                >Yep!</Button>
            </View>
        </View>
        : null
        }
      </View>
  )

    
  
}

const stylesDark = {
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: DarkModeColors.ContentBackground,
      justifyContent: 'flex-start',
    },
    label: {
      color: DarkModeColors.ContentForeground,
      fontSize: 32,
      fontWeight: "bold",
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 5,
    },
    paragraph: {
      color: DarkModeColors.ContentForeground,
      fontSize: 14,
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 5,
    },
    field: {
      padding: 5,
      height:40,
      marginBottom: 5,
      marginTop: 5,
      backgroundColor: DarkModeColors.FieldBackground,
      color: DarkModeColors.FieldForeground,
    },
    warning: {
      color: DarkModeColors.Warning,
      fontSize: 14,
      textAlign: 'center'
    },
    button: {
        marginTop: 5,
        marginBottom: 5,
        width: 120,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
  };
  
  const styles = {
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: LightModeColors.ContentBackground,
      justifyContent: 'flex-start',
    },
    label: {
      color: LightModeColors.ContentForeground,
      fontSize: 32,
      fontWeight: "bold",
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 5,
    },
    paragraph: {
      color: LightModeColors.ContentForeground,
      fontSize: 14,
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 5,
    },
    field: {
      padding: 5,
      height:40,
      marginBottom: 5,
      marginTop: 5,
      backgroundColor: LightModeColors.FieldBackground,
      color: LightModeColors.FieldForeground,
    },
    warning: {
      color: LightModeColors.Warning,
      fontSize: 14,
      textAlign: 'center'
    },
    button: {
      marginTop: 5,
      marginBottom: 5,
      width: 120,
    },
    buttonLabel: {
        color: DarkModeColors.ContentForeground,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 5,
        padding: 5,
    }
  };

export default LogWorkoutScreen;