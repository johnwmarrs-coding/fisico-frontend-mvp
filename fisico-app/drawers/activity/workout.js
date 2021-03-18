import * as React from 'react';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import ThemeContext from '../../contexts/themeContext';
import { LightModeColors, DarkModeColors } from '../../styles/colors';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const Workout = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <Card style={themeContext.darkMode ? stylesDark.container : styles.container}>
      <Card.Title title="Your Workout" subtitle="Card Subtitle" left={LeftContent} />
      <Card.Content>
        <Title>Card title</Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button>Details</Button>
      </Card.Actions>
    </Card>
  )
}

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: DarkModeColors.ContentBackground
  },
  label: {
    color: DarkModeColors.ContentForeground,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: LightModeColors.ContentBackground
  },
  label: {
    color: LightModeColors.ContentForeground,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default Workout;