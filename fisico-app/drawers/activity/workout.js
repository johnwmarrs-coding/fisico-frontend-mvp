import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ThemeContext from '../../contexts/themeContext';
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
  const toggleDetailsVisible = () => setDetailsVisible(!detailsVisible);
  useEffect(() => {
    setWorkoutIcon(chooseIcon(props.info.workout_type));
  }, []);
  const themeContext = useContext(ThemeContext);
  const Icon = iconProps =>
  <Avatar.Icon
    color={themeContext.darkMode ? DarkModeColors.CardForeground : LightModeColors.CardForeground}
    style={styling(themeContext).icon}
    {...iconProps}
    icon={workoutIcon}
    size={70}
  />

  return (
      <Card
        style={styling(themeContext).container}
        elevation={4}
        //onPress={() => props.onPress()}
        onPress={toggleDetailsVisible}
      >
        <Card.Title 
          titleStyle={styling(themeContext).title}
          subtitleStyle={styling(themeContext).title}
          title={props.info.name}
          subtitle={props.info.workout_type}
          left={Icon}
        />
        {detailsVisible &&
        <Card.Content style={styling(themeContext).details}>
          {props.info.plan.map((plan, index) => (
            <Text
              key={index}
              style={styling(themeContext).detailsLabel}
            >
              {plan.name}
            </Text>
          ), [])}
          <WorkoutDetails
            workoutObject={props.info}
          />
        </Card.Content>
        }
      </Card>
  )
}

function styling(themeContext) {
  const style = StyleSheet.create({
    container: {
      backgroundColor: themeContext.darkMode ? DarkModeColors.CardBackground : LightModeColors.CardBackground,
      paddingTop: 5,
      marginVertical: 5

    },
    title: {
      color: themeContext.darkMode ? DarkModeColors.CardForeground : LightModeColors.CardForeground,
      textTransform: "capitalize",
    },
    details: {
      justifyContent: "flex-start"
    },
    detailsLabel: {
      color: themeContext.darkMode ? DarkModeColors.CardForeground : LightModeColors.CardForeground,
      textTransform: "capitalize",
    },
    icon: {
      paddingRight: 20, // For some reason the icon isn't lined up
      backgroundColor: themeContext.darkMode ? DarkModeColors.CardBackground : LightModeColors.CardBackground
    }
  })

  return style;
}

export default Workout;