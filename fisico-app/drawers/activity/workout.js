import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ThemeContext from '../../contexts/themeContext';
import { LightModeColors, DarkModeColors } from '../../styles/colors';
import { Avatar, Button, Card } from 'react-native-paper';

function chooseIcon(type) {
  if (type == "Distance")
    return "run";
  else if (type == "Weight Lifting")
    return "weight";
  else if (type == "Rest")
    return "power-sleep";
}

const Workout = (props) => {
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
      <Card style={themeContext.darkMode ? darkStyles.container : styles.container}>
        <Card.Title 
          titleStyle={themeContext.darkMode ? darkStyles.label : styles.label}
          subtitleStyle={themeContext.darkMode ? darkStyles.label : styles.label}
          title={props.info.name}
          subtitle={props.info.workout_type}
          left={Icon}
        />
        {/* <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content> */}
        <Card.Actions style={themeContext.darkMode ? darkStyles.details : styles.details}>
          <Button>Details</Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

const darkStyles = StyleSheet.create({
  layout: {
    flex: 1,
    margin: "auto",
    paddingVertical: 5,
    height: 160,
    minWidth: "40%"
  },
  container: {
    flexGrow: 1,
    backgroundColor: DarkModeColors.CardBackground
  },
  label: {
    color: DarkModeColors.CardForeground
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
      height: 160,
      minWidth: "40%"
    },
    container: {
      flex: 1,
      backgroundColor: LightModeColors.CardBackground
    },
    label: {
      color: LightModeColors.CardForeground
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