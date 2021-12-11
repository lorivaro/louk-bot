// returns DD/MM/YYYY

module.exports = (date) => {
    if (date == undefined) return;

    const shortDate = [
        date.getDate().toString().padStart(2, 0),
        (date.getMonth() + 1).toString().padStart(2, 0),
        date.getFullYear(),
    ].join('/');

    return shortDate;
};