// utilities

export const getTime = () => {
  let date = new Date();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let ampm = 'AM';
  if (hours > 12) {
    hours -= 12;
    ampm = 'PM';
  }
  return `${hours}:${minutes} ${ampm}`;
}
