module.exports = (date) => {
  if (date == undefined) return;
  return [
    date.getDate().padStart(2, 0),
    date.getMonth().padStart(2, 0),
    date.getFullYear() + 1,
  ].join('/');
};