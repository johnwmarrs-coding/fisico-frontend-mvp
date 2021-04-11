export const validateDuration = (text) => {
    let arr = text.split(":");

    if (arr.length > 3) {
        return false;
    }

    else if (arr.length == 3) {
        let hours = parseInt(arr[0]);
        let minutes = parseInt(arr[1]);
        let seconds = parseFloat(arr[2]);

        if ( (isNaN(hours)) || (isNaN(minutes)) || (isNaN(seconds)) ) {
            return false;
        }
        else if (minutes >= 60 || seconds >= 60) {
            return false;
        }
    }
    
    else if (arr.length == 2) {
        let minutes = parseInt(arr[0]);
        let seconds = parseFloat(arr[1]);

        if ( (isNaN(minutes)) || (isNaN(seconds)) ) {
            return false;
        }
        else if (minutes >= 60 || seconds >= 60) {
            return false;
        }
    } 

    else if (arr.length == 1) {
        let seconds = parseFloat(arr[0]);

        if (isNaN(seconds)) {
            return false;
        }
        else if (seconds >= 60) {
            return false;
        }
    }
    
    return true;
};

export const parseDuration = (text) => {
    let arr = text.split(":");

    if (arr.length == 3) {
        let hours = parseInt(arr[0]);
        let minutes = parseInt(arr[1]);
        let seconds = parseFloat(arr[2]);
        let time = hours*3600 + minutes*60 + seconds;
    }
    else if (arr.length == 2) {
        let minutes = parseInt(arr[0]);
        let seconds = parseFloat(arr[1]);
        let time = minutes*60 + seconds;
    }
    else if (arr.length == 1) {
        let seconds = parseFloat(arr[0]);
        let time = seconds;
    }
    return time;
};