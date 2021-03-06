import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LightModeColors, DarkModeColors } from '../../styles/colors';
import { Avatar, Card } from 'react-native-paper';
import WorkoutDetails from './workoutDetails';

function chooseIcon(type) {
  if (type == "Distance")
    return "run";
  else if (type == "Weight Lifting")
    return "weight";
  else if (type == "Rest")
    return "power-sleep";
}

const Workout = (props) => {
  // Icon
  const [workoutIcon, setWorkoutIcon] = useState("");  
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [types, setTypes] = useState([]);
  const toggleDetailsVisible = () => setDetailsVisible(!detailsVisible);
  const hasDetails = props.info.plan.length > 0 || props.info.results.length > 0;
  useEffect(() => {
    setWorkoutIcon(chooseIcon(props.info.workout_type));
    var tempTypes = [];
    props.info.plan.map((item) => {
      const hasLift = item.hasOwnProperty('weight');
      const hasDist = item.hasOwnProperty('distance');
      hasLift && !tempTypes.includes("Lift") && tempTypes.push("Lift");
      hasDist && !tempTypes.includes("Distance") && tempTypes.push("Distance");
    })
    props.info.results.map((item) => {
      const hasLift = item.hasOwnProperty('weight');
      const hasDist = item.hasOwnProperty('distance');
      hasLift && !tempTypes.includes("Lift") && tempTypes.push("Lift");
      hasDist && !tempTypes.includes("Distance") && tempTypes.push("Distance");
    })

    setTypes(tempTypes);
  }, []);

  const Icon = iconProps =>
  <Avatar.Icon
    color={LightModeColors.CardForeground}
    style={styles.icon}
    style={[styles.icon, {backgroundColor: props.info.completed ? LightModeColors.CompletedBackground : LightModeColors.CardBackground}]}
    {...iconProps}
    icon={workoutIcon}
    size={70}
  />

  return (
      <Card
        style={[styles.container, {backgroundColor: props.info.completed ? LightModeColors.CompletedBackground : LightModeColors.CardBackground}]}
        elevation={4}
        onPress={hasDetails && toggleDetailsVisible}
      >
        <Card.Title 
          titleStyle={styles.title}
          subtitleStyle={styles.title}
          title={props.info.name}
          subtitle={props.info.workout_type}
          left={Icon}
        />
        {detailsVisible &&
        <Card.Content style={styles.details}>
          {props.info.plan.map((plan, index) => (
            <Text
              key={index}
              style={styles.detailsLabel}
            >
              {plan.name}
            </Text>
          ), [])}
          <WorkoutDetails
            screen={"homeScreen"}
            types={types}
            workoutObject={props.info}
          />
        </Card.Content>
        }
      </Card>
  )
}


  const styles = StyleSheet.create({
    container: {
      backgroundColor: LightModeColors.CardBackground,
      paddingTop: 5,
      marginVertical: 5
    },
    title: {
      color: LightModeColors.CardForeground,
      textTransform: "capitalize",
    },
    details: {
      justifyContent: "flex-start"
    },
    detailsLabel: {
      color: LightModeColors.CardForeground,
      textTransform: "capitalize",
    },
    icon: {
      paddingRight: 20, // For some reason the icon isn't lined up
      backgroundColor: LightModeColors.CardBackground
    }
  })


export default Workout;