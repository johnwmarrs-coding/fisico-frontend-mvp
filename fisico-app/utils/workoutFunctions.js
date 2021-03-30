
export const calcTotalResultDistance = (workout) => {
    var workout_results = [];
    var distance_sum = 0;
    workout_results = workout.results;
    for (var i = 0; i < workout_results.length; i++){
        var current_result = workout_results[i];
        if (current_result.distance != null){
            distance_sum += current_result.distance
        }
    }
}

export const calcTotalPlannedDistance = (workout) => {

}