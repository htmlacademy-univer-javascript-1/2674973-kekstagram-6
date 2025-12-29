function parseTimeToMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  if (timeString.includes('.')) {
    const [h, m] = timeString.split('.').map(Number);
    return h * 60 + (m >= 1 ? m * 6 : 0);
  }
  return hours * 60 + (minutes || 0);
}
function isMeetingWithinWorkday(startWork, endWork, startMeeting, duration) {
  const workStart = parseTimeToMinutes(startWork);
  const workEnd = parseTimeToMinutes(endWork);
  const meetingStart = parseTimeToMinutes(startMeeting);
  const meetingEnd = meetingStart + duration;
  return meetingStart >= workStart && meetingEnd <= workEnd;
}
