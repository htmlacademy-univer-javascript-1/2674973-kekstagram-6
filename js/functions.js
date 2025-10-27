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


console.log(isMeetingWithinWorkday('08:00', '17:30', '14:00', 90));  
console.log(isMeetingWithinWorkday('8:0', '10:0', '8:0', 120));      
console.log(isMeetingWithinWorkday('08:00', '17:30', '17:00', 90));  
console.log(isMeetingWithinWorkday('14:00', '17:30', '08:00', 90)); 
console.log(isMeetingWithinWorkday('8:00', '17:30', '8:00', 900));    
