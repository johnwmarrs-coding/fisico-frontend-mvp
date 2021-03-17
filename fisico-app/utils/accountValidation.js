
const validateEmail = (text) => {
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regexEmail.test(text)) {
        return true;
    } else {
        return false;
    }
}

export { validateEmail };