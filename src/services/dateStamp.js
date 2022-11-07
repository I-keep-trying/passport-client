const dateStamp = () => {
  const event = new Date(Date.now())
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  const dateTimeStamp = event.toLocaleString('en-US', options).toString()
  return dateTimeStamp
}

export default dateStamp
