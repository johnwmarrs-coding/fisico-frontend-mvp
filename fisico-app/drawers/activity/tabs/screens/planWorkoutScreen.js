import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { LightModeColors, DarkModeColors } from '../../../../styles/colors';
import Workout from '../../workout';
import  AppDataContext  from '../../../../contexts/appDataContext';
import {WorkoutTypes, WorkoutFields, LiftFields, DistanceFields, CommonLifts, DetailTypes, DistanceUnits, WeightUnits} from '../../../../utils/workoutTypes';
import { FetchWorkoutArray, SaveWorkout } from '../../../../utils/workoutStorage';
import {FISICO_URL} from '../../../../utils/urls';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import WorkoutDetails from "../../workoutDetails";

const PlanWorkoutScreen = ( {navigation}, props) => {
  const appDataContext = useContext(AppDataContext);

  const [workoutType, setWorkoutType] = useState('Distance');
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');

  const [workoutDate, setWorkoutDate] = useState('');
  const [workoutTime, setWorkoutTime] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);


  const [workoutResults, setWorkoutResults] = useState([]);
  const [workoutDetailType, setWorkoutDetailType] = useState('Distance');
  const [usedWorkoutDetailTypes, setUsedWorkoutDetailTypes] = useState([]);
  const [workoutDetailName, setWorkoutDetailName] = useState('');
  const [workoutDetailDistance, setWorkoutDetailDistance] = useState('');
  const [workoutDetailUnits, setWorkoutDetailUnits] = useState('');
  const [workoutDetailDuration, setWorkoutDetailDuration] = useState('');
  const [workoutDetailNumSets, setWorkoutDetailNumSets] = useState('');
  const [workoutDetailNumReps, setWorkoutDetailNumReps] = useState('');
  const [workoutDetailWeight, setWorkoutDetailWeight] = useState('');
  const [tempWorkoutResult, setTempWorkoutResult] = useState({});

  const [proposedWorkout, setProposedWorkout] = useState(null);
  const [postFailed, setPostFailed] = useState(false);

  const [entryState, setEntryState] = useState(0);

  const sendPostWorkoutRequest = async () => {
    try {
      let response = await fetch(FISICO_URL + '/workout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proposedWorkout)
      });
      let json = await response.json();
      if (json.success) {
        console.log('SUCCESS');
        console.log('MESSAGE: ' + json.msg);
        console.log('WORKOUT: ' + json.workout);
        console.log(JSON.stringify(json));
      }else {
        console.log("FAILURE");
        console.log(JSON.stringify(json));
        setPostFailed(true);
      }
      
    } catch (error) {
      console.error(error);
      setPostFailed(true);
    }
  }

  return (
      <ScrollView style={styles.container}>
          {entryState == 0 ?
            <View>
                <Text style={styles.label}>Workout Overview</Text>
                <TextInput
                    placeholder='workout name'
                    onChangeText={text => setWorkoutName(text)}
                    value={workoutName}
                    style={styles.field}
                />
                <TextInput
                    placeholder='description'
                    onChangeText={text => setWorkoutDescription(text)}
                    value={workoutDescription}
                    style={styles.field}
                />
                <TextInput
                    placeholder='date'
                    onFocus={() => setIsDatePickerVisible(true)}
                    value={workoutDate == '' ? '' : workoutDate.toString()}
                    style={styles.field}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode='datetime'
                    onConfirm={(date) => {setWorkoutDate(date); setIsDatePickerVisible(false);}}
                    onCancel={() => setIsDatePickerVisible(false)}
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
                        style={styles.button}
                        onPress={navigation.goBack}
                    >Cancel</Button>
                    <Button
                        style={styles.button}
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
            <Text>Detail Type</Text>
            <Picker 
                selectedValue={workoutDetailType}
                onValueChange={(itemValue, itemIndex) => {
                    setWorkoutDetailType(itemValue);
                    setWorkoutDetailUnits(itemValue == 'Distance' ? DistanceUnits[0] : WeightUnits[0]);
                }}
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
                style={styles.field}
            />
            { workoutDetailType == 'Distance' ?
                <View>
                    <TextInput
                        placeholder='Distance'
                        onChangeText={text => setWorkoutDetailDistance(text)}
                        value={workoutDetailDistance}
                        style={styles.field}
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
                        style={styles.field}
                    />
                    
                    
                </View>
                : 
                <View>
                    <TextInput
                        placeholder='Weight'
                        onChangeText={text => setWorkoutDetailWeight(text)}
                        value={workoutDetailWeight}
                        style={styles.field}
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
                        value={workoutDetailNumSets}
                        style={styles.field}
                    />
                    <TextInput
                        placeholder='Reps'
                        onChangeText={text => setWorkoutDetailNumReps(text)}
                        value={workoutDetailNumReps}
                        style={styles.field}
                    />
                </View>
                
            }
            <View style={styles.row}>
                <Button
                    mode='contained'
                    style={styles.button}
                    onPress={() => setEntryState(entryState - 1)}
                >Previous</Button>
                <Button
                    mode='contained'
                    style={styles.button}
                    onPress={() => {
                            let result = {};
                            if (workoutDetailType == 'Distance'){
                                result = {
                                    name: workoutDetailName,
                                    distance: Number(workoutDetailDistance),
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
                                    weight: Number(workoutDetailWeight),
                                    units: workoutDetailUnits,
                                    num_sets: Number(workoutDetailNumSets),
                                    num_reps: Number(workoutDetailNumReps),
                                }
                                let tempResults = workoutResults;
                                tempResults.push(result);
                                setTempWorkoutResult({});
                                setWorkoutResults(tempResults);
                            }
                            let tempTypes = usedWorkoutDetailTypes;
                            !usedWorkoutDetailTypes.includes(workoutDetailType) && tempTypes.push(workoutDetailType);
                            setUsedWorkoutDetailTypes(tempTypes);

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
                    style={styles.button}
                    onPress={() => {
                            let newWorkout = {
                                name: workoutName,
                                description: workoutDescription,
                                workout_type: workoutType,
                                date: workoutDate,
                                start_time: null,
                                completed: false,
                                plan: workoutResults,
                                results: [],
                                user_id: appDataContext.userID,

                            }
                            setProposedWorkout(newWorkout);
                            setEntryState(entryState + 1);
                        }
                    }
                >Next</Button>
            </View>

            {/* Details of the log */}
            {workoutResults.length > 0 &&
                <Card style={styles.details} elevation={4}>
                    <WorkoutDetails
                        screen={"planWorkoutScreen"}
                        types={usedWorkoutDetailTypes}
                        workoutObject={{
                            plan: workoutResults,
                            results: [],
                            workout_type: workoutType,
                    }}/>
                </Card>
            }
        </View>
        : null
        }
        {entryState == 2 ?
        <View>
            <Text>Does this look right?</Text>
            <Workout info={proposedWorkout}/>
            <View style={styles.row}>
                <Button
                    mode='contained'
                    style={styles.button}
                    onPress={() => setEntryState(entryState - 1)}
                >Nope</Button>
                <Button
                    mode='contained'
                    style={styles.button}
                    onPress={async () => {
                        console.log('SAVE WORKOUT');
                        console.log('workout to save: ' + JSON.stringify(proposedWorkout));
                        await sendPostWorkoutRequest();
                        appDataContext.triggerRefresh(new Date());
                        navigation.goBack();
                    }}
                >Yep!</Button>
            </View>
        </View>
        : null
        }
      </ScrollView>
  )

    
  
}

  const styles = {
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: LightModeColors.ContentBackground,
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
        paddingBottom: 20,
    },
    details: {
        backgroundColor: LightModeColors.CardBackground,
    },
  };

export default PlanWorkoutScreen;