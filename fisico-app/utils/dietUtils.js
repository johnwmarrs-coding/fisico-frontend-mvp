export const GenderOptions = ['m', 'f'];
export const GoalOptions = ['bulk', 'cut', 'none'];
export const HeightUnitOptions = ['ft & in', 'cm'];
export const WeightOptions = ['lbs', 'kg'];

export const calculate_calories = (age, weight, height, gender, goal) =>
{
    let suggested_calories = 0;
    
    if(gender == 'm')
    {
        suggested_calories = (9.99 * weight) + (6.25 * height) - (4.92 * age) + 5;
        if(goal == "bulk")
        {
            suggested_calories = (.10 * suggested_calories) + suggested_calories;
        }
        else if(goal == "cut")
        {
            suggested_calories = suggested_calories - (.05 * suggested_calories);
        }
    }
    else if(gender == 'f')
    {
        suggested_calories = (9.99 * weight) + (6.25 * height) - (4.92 * age) - 161;
        if(goal == "bulk")
        {
            suggested_calories = (.10 * suggested_calories) + suggested_calories;
        }
        else if(goal == "cut")
        {
            suggested_calories = suggested_calories - (.05 * suggested_calories);
        }

    }
    return suggested_calories * 1.55;
}

export const calculate_bmi = (weight, height) =>
{
    // weight given in kg, height given in cm
    var height_m = height / 100;
    var weight_kg = weight;

    var bmi = weight_kg / (height_m * height_m);
    return bmi;
}