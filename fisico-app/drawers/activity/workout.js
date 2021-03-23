import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ThemeContext from '../../contexts/themeContext';
import { LightModeColors, DarkModeColors } from '../../styles/colors';
import { Avatar, TouchableRipple, Card, Modal, Portal, Provider } from 'react-native-paper';

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

  // Modal
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <View style={themeContext.darkMode ? darkStyles.layout : styles.layout}>
        <TouchableRipple>
          <Card
            style={themeContext.darkMode ? darkStyles.container : styles.container}
            elevation={5}
            onPress={showModal}
          >
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
          </Card>
        </TouchableRipple>
      </View>
      <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={themeContext.darkMode ? darkStyles.modal : styles.modal}
          >
            <Text>
              {JSON.stringify(props.info)}
            </Text>
          </Modal>
        </Portal>
    </Provider>
  )
}

const darkStyles = StyleSheet.create({
  layout: {
    flex: 1,
    margin: "auto",
    paddingVertical: 5,
    height: 160,
    width: "90%",
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
      margin: "auto",
      paddingVertical: 5,
      height: 160,
      width: "90%",
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
    },
    modal: {
      backgroundColor: LightModeColors.MenuBackground,
      padding: 20
    }
  }
);

export default Workout;