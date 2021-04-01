import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LightModeColors, DarkModeColors } from '../../styles/colors';
import { DataTable } from 'react-native-paper';

const WorkoutDetails = (props) => {
  const [page, setPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(-1);

  useEffect(() => {
  const planExists = props.workoutObject.plan.length != 0;
  const resultExists = props.workoutObject.completed;
    if (planExists && !resultExists) {
      setNumberOfPages(1)
      setPage(0);
    }
    else if (planExists && resultExists) {
      setNumberOfPages(2);
      setPage(0);
    }
    else if (!planExists && resultExists) {
      setNumberOfPages(1);
      setPage(1);
    }
  }, [])

  const entries = () => {
    return (
      page == 0 ? 
        props.workoutObject.plan.map((plan, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>
              <Text style={styles.text}>
                {plan.name}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              {props.workoutObject.workout_type == "Weight Lifting" &&
                <Text style={styles.text}>
                  {plan.weight}                  
                </Text>
              }
              {props.workoutObject.workout_type == "Distance" &&
                <Text style={styles.text}>
                  {plan.distance}
                </Text>
              }
            </DataTable.Cell>
            <DataTable.Cell numeric>
              {props.workoutObject.workout_type == "Weight Lifting" &&
                <Text style={styles.text}>
                  {plan.num_sets}
                </Text>
              }
              {props.workoutObject.workout_type == "Distance" &&
                <Text style={styles.text}>
                  {plan.duration}
                </Text>
              }
            </DataTable.Cell>
            {props.workoutObject.workout_type == "Weight Lifting" &&
              <DataTable.Cell numeric>
                <Text style={styles.text}>
                  {plan.num_reps}
                </Text>
              </DataTable.Cell>
            }
          </DataTable.Row>
        ))
      :
        props.workoutObject.results.map((result, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>
              <Text style={styles.text}>
                {result.name}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              {props.workoutObject.workout_type == "Weight Lifting" &&
                <Text style={styles.focusedText}>
                  {result.weight}                  
                </Text>
              }
              {props.workoutObject.workout_type == "Distance" &&
                <Text style={styles.focusedText}>
                  {result.distance}
                </Text>
              }
            </DataTable.Cell>
            <DataTable.Cell numeric>
              {props.workoutObject.workout_type == "Weight Lifting" &&
                <Text style={styles.focusedText}>
                  {result.num_sets}
                </Text>
              }
              {props.workoutObject.workout_type == "Distance" &&
                <Text style={styles.focusedText}>
                  {result.duration}
                </Text>
              }
            </DataTable.Cell>
            {props.workoutObject.workout_type == "Weight Lifting" &&
              <DataTable.Cell numeric>
                <Text style={styles.focusedText}>
                  {result.num_reps}
                </Text>
              </DataTable.Cell>
            }
          </DataTable.Row>
        ))
    )
  }

  return (
    <DataTable style={styles.dataTable}>
      <DataTable.Header>
        <DataTable.Title>
          <Text style={styles.titleText}>
            Name
          </Text>
        </DataTable.Title>

        <DataTable.Title numeric>
          {props.workoutObject.workout_type == "Weight Lifting" &&
            <Text style={styles.titleText}>
              {`Wt.`}
            </Text>
          }
          {props.workoutObject.workout_type == "Distance" &&
            <Text style={styles.titleText}>
              {`Dist.`}
            </Text>
          }
        </DataTable.Title>

        {props.workoutObject.workout_type == "Weight Lifting" &&
          <DataTable.Title numeric>
            <Text style={styles.titleText}>
              Sets
            </Text>  
          </DataTable.Title>
        }
        
        {props.workoutObject.workout_type == "Weight Lifting" ?
          <DataTable.Title numeric>
            <Text style={styles.titleText}>
              Reps
            </Text>  
          </DataTable.Title>
        :
          <DataTable.Title numeric>
            <Text style={styles.titleText}>
              Duration
            </Text>  
          </DataTable.Title>
        }
        
      </DataTable.Header>

      {/* Displays either plan or results numbers */}
      {entries()}

      <DataTable.Pagination
        page={page}
        numberOfPages={numberOfPages}
        onPageChange={page => setPage(page)}
        label={
          <Text style={styles.text}>
            {page == 0 ? "Plan" : "Results"}
          </Text>}
      />
    </DataTable>
  )
}

  const styles = StyleSheet.create({

    // Layout
    dataTable: {
      backgroundColor: LightModeColors.CardBackgroundLight
    },
    // Text
    pageText: {
      color:  LightModeColors.CardForeground,
      fontSize: 17,
    },
    titleText: {
      color:  LightModeColors.CardForeground,
    },
    text: {
      color:  LightModeColors.MenuForeground,
      textTransform: "capitalize",
    },
    lowerCaseText: {
      color:  LightModeColors.MenuForeground,
    },
    focusedText: {
      color: LightModeColors.MenuForegroundFocused,
      textTransform: "capitalize",
    }
  })


export default WorkoutDetails;