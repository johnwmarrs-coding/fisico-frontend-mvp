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
    style={themeContext.darkMode ? darkStyles.icon : styles.icon}
    {...iconProps}
    icon={workoutIcon}
    size="83"
  />

  return (
    <View style={themeContext.darkMode ? darkStyles.layout : styles.layout}>
      <Card
        style={themeContext.darkMode ? darkStyles.container : styles.container}
        elevation={5}
        onPress={() => props.onPress()}
      >
        <Card.Title 
          titleStyle={themeContext.darkMode ? darkStyles.label : styles.label}
          subtitleStyle={themeContext.darkMode ? darkStyles.label : styles.label}
          title={props.info.name}
          subtitle={props.info.workout_type}
          left={Icon}
        />
        <Card.Content>
          {props.info.plan.map((plan, index) => (
              <Text key={index} style={themeContext.darkMode ? darkStyles.label : styles.label}>
                {plan.name}
              </Text>
          ), [])}
          {/* <Text>
              {props.info.workout_type}
          </Text> */}
        </Card.Content>
      </Card>
    </View>

  )
}

const darkStyles = StyleSheet.create({
  layout: {
    flex: 1,
    margin: "auto",
    paddingVertical: 5,
    width: "90%",
  },
  container: {
    flexGrow: 1,
    backgroundColor: DarkModeColors.CardBackground,
    minHeight: 120
  },
  label: {
    color: DarkModeColors.CardForeground,
    textTransform: "capitalize"
  },
  details: {
    flex: 1
  },
  icon: {
    backgroundColor: DarkModeColors.CardBackground
  }
}
);

const styles = StyleSheet.create({
    layout: {
      flex: 1,
      margin: "auto",
      paddingVertical: 5,
      width: "90%",
    },
    container: {
      flex: 1,
      backgroundColor: LightModeColors.CardBackground,
      minHeight: 120
    },
    label: {
      color: LightModeColors.CardForeground,
      textTransform: "capitalize"
    },
    details: {
      flex: 1,
      color: LightModeColors.CardForeground
    },
    icon: {
      backgroundColor: LightModeColors.CardBackground
    }
  }
);

export default Workout;