import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LightModeColors, DarkModeColors } from '../../styles/colors';
import ThemeContext from '../../contexts/themeContext';
import { Modal, Card } from 'react-native-paper';

const WorkoutDetails = (props) => {
  const themeContext = useContext(ThemeContext);
  return (
  
        <View style={styling(themeContext).doubleColumn}>
          <View>
            <Text style={styling(themeContext).headerText}>
              Plan
            </Text>
            {props.workoutObject.plan.map((plan, index) => (
              <View key={index}>
                {props.workoutObject.workout_type == "Weight Lifting" &&
                <View>
                    <Text style={styling(themeContext).subheaderText}>
                      {plan.name}
                    </Text>
                    <Text style={styling(themeContext).text}>
                      {`${plan.weight}${plan.units}${plan.num_sets}${plan.num_reps}`}
                    </Text>
                  </View>
                }
                {props.workoutObject.workout_type == "Distance" &&
                <View>
                  <Text style={styling(themeContext).subheaderText}>
                    {plan.name}
                  </Text>
                  <Text style={styling(themeContext).text}>
                    {`${plan.distance}${plan.units}${plan.duration}`}
                  </Text>
                </View>
                }
                {props.workoutObject.workout_type == "Rest" &&
                  <Text style={styling(themeContext).text}>
                    Rest Day!
                  </Text>
                }
              </View>
            ))} 
          </View>
          <View>
            <Text style={styling(themeContext).headerText}>
              Results
            </Text>
            {props.workoutObject.completed &&
              <View>
                {props.workoutObject.results.map((results, index) => (
                  <View key={index}>
                    {props.workoutObject.workout_type == "Weight Lifting" &&
                      <Text style={styling(themeContext).text}>
                        {`${results.name}`}
                      </Text>
                    }
                    {props.workoutObject.workout_type == "Distance" &&
                      <Text style={styling(themeContext).text}>
                        {`${results.name}\n\t${results.distance} ${results.units}\t\t\t${results.duration} secs`}
                      </Text>
                    }
                    {props.workoutObject.workout_type == "Rest" &&
                      <Text style={styling(themeContext).subheaderText}>
                        Rest Day!
                      </Text>
                    }
                  </View>
                ))}
              </View>
            }
            {props.workoutObject.completed == false &&
              <Text style={styling(themeContext).subheaderText}>
                Not Yet Completed
              </Text>
            }
          </View>
        </View>
  )
}

function styling(themeContext) {
  const style = StyleSheet.create({

    // Layout
    modal: {
      margin: 40,
    },
    card: {
      backgroundColor: themeContext.darkMode ? DarkModeColors.CardBackground : LightModeColors.CardBackground,
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
      color: themeContext.darkMode? DarkModeColors.CardForeground : LightModeColors.CardForeground,
      textTransform: "capitalize",
    },
    headerText: {
      color: themeContext.darkMode? DarkModeColors.CardForeground : LightModeColors.CardForeground,
      textTransform: "capitalize",
      textAlign: "center",
      fontSize: 18
    },
    subheaderText: {
      color: themeContext.darkMode? DarkModeColors.MenuForegroundFocused : LightModeColors.MenuForegroundFocused,
      textTransform: "capitalize",
    },
    text: {
      color: themeContext.darkMode? DarkModeColors.MenuForeground : LightModeColors.MenuForeground,
      textTransform: "capitalize",
      paddingLeft: 20
    },
  })

  return style;
}
export default WorkoutDetails;