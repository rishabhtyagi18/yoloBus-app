const valueReducer = (id, content) => id?.split('.').reduce((result, id) => result && result[id], content);

const getDateFromTimeStamp = timestamp => {
    const date = new Date(timestamp);
    const formatter = new Intl.DateTimeFormat(['en-US', 'en-GB']);
    return formatter.format(date);
}

const amountFormatter = input => {
    const amount = parseFloat(input).toFixed(2);
    const formatter = new Intl.NumberFormat({style:'currency'});
    return formatter.format(amount);
}
export { valueReducer, getDateFromTimeStamp, amountFormatter };