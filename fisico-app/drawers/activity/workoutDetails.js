import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LightModeColors, DarkModeColors } from '../../styles/colors';
import { DataTable } from 'react-native-paper';

const WorkoutDetails = (props) => {
  const [page, setPage] = useState(0);  
  const [header, setHeader] = useState([]);
  const [entries, setEntries] = useState([]);
  const [liftExists, setLiftExists] = useState(false);
  const [distExists, setDistExists] = useState(false);
  const planExists = props.workoutObject.plan.length > 0;
  const resultExists = props.workoutObject.results.length > 0;
  const numberOfPages = planExists + resultExists;  // True is 1, False is 0

  const initialPageLabel = () => {
    if (numberOfPages == 1 && planExists) {
      return "Plan";
    }
    else if (numberOfPages == 1 && resultExists) {
      return "Result";
    }
    else if (numberOfPages == 2) {
      return page == 0 ?
        "Plan"
        :
        "Result";
    }
  }
  const [pageLabel, setPageLabel] = useState(initialPageLabel);

  useEffect(() => {
    setHeader(() => (
      <DataTable.Header style={styles.rowLayout}>
        <DataTable.Title>
            <Text style={styles.titleText}>
              Name
            </Text>
        </DataTable.Title>

        {props.types.includes("Lift") &&
          <View style={styles.rowLayout}>
            <DataTable.Title numeric>
                <Text style={styles.titleText}>
                  Wt.
                </Text>
            </DataTable.Title>

            <DataTable.Title numeric>
              <Text style={styles.titleText}>
                Sets
              </Text>  
            </DataTable.Title>

            <DataTable.Title numeric>
              <Text style={styles.titleText}>
                Reps
              </Text>  
            </DataTable.Title>
          </View>
        }

        {props.types.includes("Distance") &&
          <View style={styles.rowLayout}>
            <DataTable.Title numeric>
              <Text style={styles.titleText}>
                Dist.
              </Text>
            </DataTable.Title>

            <DataTable.Title numeric>
              <Text style={styles.titleText}>
                Duration
              </Text>  
            </DataTable.Title>
          </View>
        }
      </DataTable.Header>
    ));

    if (props.onHomeScreen) { // workout.js
      setEntries(
        pageLabel == "Plan" ?
          getRows(props.workoutObject.plan)
        :
          getRows(props.workoutObject.results)
      );
    }
    else {  // logHomeScreen.js
      setEntries(
        getRows(props.workoutObject.results)
      );
    }
  }, [props]);

  function getRows(info) {
    return(
      info.map((item, index) => (
        <DataTable.Row key={index}>
          <DataTable.Cell>
            <Text style={styles.text}>
              {item.name}
            </Text>
          </DataTable.Cell>

          {item.hasOwnProperty('weight') &&
            <View style={styles.rowLayout}>
              <DataTable.Cell numeric>
                <Text style={styles.focusedText}>
                  {item.weight} {item.units}
                </Text>
              </DataTable.Cell>

              <DataTable.Cell numeric>
                <Text style={styles.focusedText}>
                  {item.num_sets}
                </Text>
              </DataTable.Cell>

              <DataTable.Cell numeric>
                <Text style={styles.focusedText}>
                  {item.num_reps}
                </Text>
              </DataTable.Cell>
            </View>
          }

          {item.hasOwnProperty('distance') &&
            <View style={styles.rowLayout}>
              <DataTable.Cell numeric>
                <Text style={styles.focusedText}>
                  {item.distance} {item.units}
                </Text>
              </DataTable.Cell>

              <DataTable.Cell numeric>
                <Text style={styles.focusedText}>
                  {item.duration}
                </Text>
              </DataTable.Cell>
            </View>
          }
        </DataTable.Row>
      ))
    )
  }

  return (
    <DataTable>
      {header}
      {/* Displays either plan or results numbers */}
      {entries}

      {props.onHomeScreen &&
        <DataTable.Pagination
          page={page}
          numberOfPages={numberOfPages}
          onPageChange={newPage => {
            setPage(newPage);
            pageLabel == "Plan" ? setPageLabel("Result") : setPageLabel("Plan");
          }}
          label={
            <Text style={styles.titleText}>
              {pageLabel}
            </Text>
          }
        />
      }
    </DataTable>
  )
}

const styles = StyleSheet.create({
  rowLayout: {
    flexDirection: "row",
    flex: 1
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
  }
})

export default WorkoutDetails;