import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LightModeColors, DarkModeColors } from '../../styles/colors';
import { Modal, Card } from 'react-native-paper';

const WorkoutDetails = (props) => {
  return (
  
        <View style={styles.doubleColumn}>
          <View>
            <Text style={styles.headerText}>
              Plan
            </Text>
            {props.workoutObject.plan.map((plan, index) => (
              <View key={index}>
                {props.workoutObject.workout_type == "Weight Lifting" &&
                <View>
                    <Text style={styles.subheaderText}>
                      {plan.name}
                    </Text>
                    <Text style={styles.text}>
                      {`${plan.weight}${plan.units}${plan.num_sets}${plan.num_reps}`}
                    </Text>
                  </View>
                }
                {props.workoutObject.workout_type == "Distance" &&
                <View>
                  <Text style={styles.subheaderText}>
                    {plan.name}
                  </Text>
                  <Text style={styles.text}>
                    {`${plan.distance}${plan.units}${plan.duration}`}
                  </Text>
                </View>
                }
                {props.workoutObject.workout_type == "Rest" &&
                  <Text style={styles.text}>
                    Rest Day!
                  </Text>
                }
              </View>
            ))} 
          </View>
          <View>
            <Text style={styles.headerText}>
              Results
            </Text>
            {props.workoutObject.completed &&
              <View>
                {props.workoutObject.results.map((results, index) => (
                  <View key={index}>
                    {props.workoutObject.workout_type == "Weight Lifting" &&
                      <Text style={styles.text}>
                        {`${results.name}`}
                      </Text>
                    }
                    {props.workoutObject.workout_type == "Distance" &&
                      <Text style={styles.text}>
                        {`${results.name}\n\t${results.distance} ${results.units}\t\t\t${results.duration} secs`}
                      </Text>
                    }
                    {props.workoutObject.workout_type == "Rest" &&
                      <Text style={styles.subheaderText}>
                        Rest Day!
                      </Text>
                    }
                  </View>
                ))}
              </View>
            }
            {props.workoutObject.completed == false &&
              <Text style={styles.subheaderText}>
                Not Yet Completed
              </Text>
            }
          </View>
        </View>
  )
}

  const styles = StyleSheet.create({

    // Layout
    modal: {
      margin: 40,
    },
    card: {
      backgroundColor: LightModeColors.CardBackground,
      padding: 10,
      width: "100%",
      margin: "auto"
    },
    doubleColumn: {
      justifyContent: "space-between",
      flexDirection: "row"
    },


    // Text
    titleText: {
      color: LightModeColors.CardForeground,
      textTransform: "capitalize",
    },
    headerText: {
      color: LightModeColors.CardForeground,
      textTransform: "capitalize",
      textAlign: "center",
      fontSize: 18
    },
    subheaderText: {
      color: LightModeColors.MenuForegroundFocused,
      textTransform: "capitalize",
    },
    text: {
      color: LightModeColors.MenuForeground,
      textTransform: "capitalize",
      paddingLeft: 20
    },
  })

export default WorkoutDetails;