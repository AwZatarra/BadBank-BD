const validate = (field, label, setStatus) => {
    if (!field) {
        setStatus('Error: ' + label);
        return false;
    }
    setStatus(null);
    return true;
}

export default validate;