module.exports = (date) => {
  if (date == undefined) return;
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};