import AsyncStorage from '@react-native-async-storage/async-storage';
// PURPOSE: UTIL FOR ASYNCSTORAGE

// * NOTE: ALL RECORDS STORED BY DATE

export const FetchWorkoutArray = async () => {
    // retrieves Workouts array from AsynStorage
    try {
        let workouts = await AsyncStorage.getItem('workouts');
        workouts = JSON.parse(workouts);
        console.log('Workouts: ' + JSON.stringify(workouts));
        if (workouts !== null) {
            console.log('WORKOUTS WAS NOT NULL')
            return workouts;
        } else {
            console.log('WORKOUTS WAS NULL')
            await SaveWorkoutArray([]);
            return [];
        }
    } catch(e) {
        console.log(e);
        return [];
    }
}

export const SaveWorkoutArray = async (workouts) => {
    try {
        console.log('Saving Workouts: ' + JSON.stringify(workouts));
        await AsyncStorage.setItem('workouts', JSON.stringify(workouts));
        console.log('Workout Array Saved');
        return true;
    } catch (e){
        console.log(e);
        return false;
    }
    
}

export const SaveWorkout = async (workout) => {
    // Save to local storage
    // Step 1: Retrieve Local Workout Collection
    try {
        console.log('Saving Workout: ' + workout);
        var workouts_arr = await FetchWorkoutArray();
        console.log('Workouts array before pushing: ' + JSON.stringify(workouts_arr));
        if(workouts_arr.length == 0) {
            console.log('Adding to empty array');
            workouts_arr.push(workout);
        }
        else {
            console.log('Adding to non-empty array')
            for (var i = 0; i < workouts_arr.length; i++){
                if (workouts_arr[i].date < workout.date){
                    workouts_arr.splice(i, 0, workout);
                    break;
                }
            }
        }
        console.log('Workout array before saving: ' + JSON.stringify(workouts_arr));
        await SaveWorkoutArray(workouts_arr);
    } catch (e){
        console.log(e);
    }
    // Step 2: Save Workout
}

export const GetWorkouts = (days=-1) => {
    // negative days indicates all workouts
    // 0 indicates todays workouts
    // positive numbers indicate days past

}

export const GetWorkoutsByType = (type, days=-1) => {

}
