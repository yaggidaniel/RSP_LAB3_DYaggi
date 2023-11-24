const filterByTypeData = (type) => vehicle.filter(person => typeData[type] && person instanceof typeData[type]);

const calculateKeyAverage = (type, key) => {
    const sum = filterByTypeData(type).reduce((totalAcc, person) => totalAcc + person[key], 0);
    const total = filterByTypeData(type).length
    return total > 0 ? (sum / total).toFixed(2) : 0;
}

const orderByKey = (key, array) => {
    if (array.every(obj => obj.hasOwnProperty(key))) {
        return array.sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
    }
    return array;
}
