import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LightModeColors, DarkModeColors } from '../../styles/colors';
import ThemeContext from '../../contexts/themeContext';
import { Modal, Card } from 'react-native-paper';

const WorkoutDetails = (props) => {
  const themeContext = useContext(ThemeContext);
  return (
  <Modal
    visible={props.shownModal == props.workoutIndex}  // this is really janky but works
    onDismiss={() => props.setShownModal(-1)}
    onRequestClose={() => props.setShownModal(-1)}
    transparent={false}
    contentContainerStyle={styling(themeContext).modal}
  >
    <Card
      style={styling(themeContext).card}
      elevation={4}
    >
      <Card.Title
        title={props.workoutObject.name}
        titleStyle={styling(themeContext).text}
        subtitle={props.workoutObject.completed ? "Completed" : "Not Yet Completed"}
        subtitleStyle={styling(themeContext).text}
      />
      <Card.Content>
        {props.workoutObject.plan.map((plan, index) => (
          <View key={index}>
            {props.workoutObject.workout_type == "Weight Lifting" &&
              <Text style={styling(themeContext).text}>
                {`${plan.name}\n\t${plan.weight} ${plan.units}\t\t\t${plan.num_sets} sets\t\t\t${plan.num_reps} reps`}
              </Text>
            }
            {props.workoutObject.workout_type == "Distance" &&
              <Text style={styling(themeContext).text}>
                {`${plan.name}\n\t${plan.distance} ${plan.units}\t\t\t${plan.duration} secs`}
              </Text>
            }
            {props.workoutObject.workout_type == "Rest" &&
              <Text style={styling(themeContext).text}>
                Rest Day!
              </Text>
            }
          </View>
        ))}
      </Card.Content>
    </Card>
  </Modal>
  )
}

function styling(themeContext) {
  const style = StyleSheet.create({
    modal: {
      margin: 40,
    },
    card: {
      backgroundColor: themeContext.darkMode ? DarkModeColors.CardBackground : LightModeColors.CardBackground,
      padding: 10,
      width: "100%",
      margin: "auto"
    },
    text: {
      color: themeContext.darkMode? DarkModeColors.CardForeground : LightModeColors.CardForeground,
      textTransform: "capitalize",
    },
  })

  return style;
}
export default WorkoutDetails;