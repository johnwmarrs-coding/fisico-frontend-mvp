import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ThemeContext from '../../contexts/themeContext';
import { LightModeColors, DarkModeColors } from '../../styles/colors';
import { Avatar, TouchableRipple, Card, Modal, Portal, Provider, Title, Paragraph } from 'react-native-paper';

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
    size={60}
  />

  // Modal
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const toggleVisiblity = () => setVisible(!visible);

  return (
     
          <Card
            style={themeContext.darkMode ? darkStyles.container : styles.container}
            elevation={5}
            onPress={toggleVisiblity}
          >
            <Card.Title 
              titleStyle={themeContext.darkMode ? darkStyles.label : styles.label}
              subtitleStyle={themeContext.darkMode ? darkStyles.label : styles.label}
              title={props.info.name}
              subtitle={props.info.workout_type}
              left={Icon}
            />
            {visible ? 
              <Card.Content>
                <Title>{props.info.name}</Title>
                <Paragraph>{props.info.description}</Paragraph>
              </Card.Content>
              : null  
            }
          </Card>
       

  )
}

const darkStyles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingVertical: 5,
    width: "95%",
    alignSelf: 'center',
  },
  container: {
    backgroundColor: DarkModeColors.CardBackground,
    justifyContent: 'center',
    marginVertical: 5
  },
  label: {
    color: DarkModeColors.CardForeground
  },
  details: {
  },
  icon: {
    backgroundColor: DarkModeColors.CardBackground
  },
  modal: {
    backgroundColor: DarkModeColors.MenuBackground,
    padding: 20
  }
}
);

const styles = StyleSheet.create({
    layout: {
      flex: 1,
      paddingVertical: 5,
      width: "95%",
      alignSelf: 'center'
    },
    container: {
      backgroundColor: LightModeColors.CompletedBackground,
      marginTop: 5,
    },
    label: {
      color: LightModeColors.CardForeground
    },
    details: {
      color: LightModeColors.CardForeground
    },
    icon: {
      backgroundColor: LightModeColors.CompletedBackground
    },
    modal: {
      backgroundColor: LightModeColors.CompletedBackground,
      padding: 20
    }
  }
);

export default Workout;