module.exports = (date) => {
  if (date == undefined) return;
  return [
    date.getDate().toString().padStart(2, 0),
    (date.getMonth() + 1).toString().padStart(2, 0),
    date.getFullYear(),
  ].join('/');
};