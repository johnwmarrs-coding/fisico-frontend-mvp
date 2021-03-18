import * as React from 'react';
import { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import ThemeContext from '../../contexts/themeContext';
import { LightModeColors, DarkModeColors } from '../../styles/colors';
import { Avatar, Button, Card } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
const WorkoutType = {
  RUN: "Run",
  WALK: "Walk",
  BIKE: "Bike",
  SWIM: "Swim",
  LIFT: "Lift",
  REST: "Rest",
  OTHER: "Custom"
}

const Workout = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <View style={themeContext.darkMode ? darkStyles.layout : styles.layout}>
      <Card style={themeContext.darkMode ? darkStyles.container : styles.container}>
        <Card.Title 
          titleStyle={themeContext.darkMode ? darkStyles.label : styles.label}
          subtitleStyle={themeContext.darkMode ? darkStyles.label : styles.label}
          title={WorkoutType.RUN}
          subtitle="A Workout Designed by You"
          left={LeftContent}
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
    }
  }
);

export default Workout;