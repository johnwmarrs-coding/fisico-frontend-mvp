import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ThemeContext from '../../contexts/themeContext';
import { LightModeColors, DarkModeColors } from '../../styles/colors';
import { Avatar, Card } from 'react-native-paper';

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
    <View style={styling(themeContext).layout}>
      <Card
        style={styling(themeContext).container}
        elevation={4}
        onPress={() => props.onPress()}
      >
        <Card.Title 
          titleStyle={styling(themeContext).title}
          subtitleStyle={styling(themeContext).title}
          title={props.info.name}
          subtitle={props.info.workout_type}
          left={Icon}
        />
        <Card.Content style={styling(themeContext).details}>
          {props.info.plan.map((plan, index) => (
            <Text
              key={index}
              style={styling(themeContext).detailsLabel}
            >
              {plan.name}
            </Text>
          ), [])}
        </Card.Content>
      </Card>
    </View>
  )
}

function styling(themeContext) {
  const style = StyleSheet.create({
    layout: {
      flex: 1,
      paddingVertical: 5,
      width: "100%",
    },
    container: {
      backgroundColor: themeContext.darkMode ? DarkModeColors.CardBackground : LightModeColors.CardBackground,
      minHeight: 125,

    },
    title: {
      color: themeContext.darkMode ? DarkModeColors.CardForeground : LightModeColors.CardForeground,
      textTransform: "capitalize",
    },
    details: {

      flex: 1,
      justifyContent: "flex-end"
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