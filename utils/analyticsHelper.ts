
export function getTimeDifference  (
 userCurrentPunchedEventsTime: Date,
 userPreviousPunchedEventsTime: Date,
) {
 const currentTime = new Date(userCurrentPunchedEventsTime).getTime()
 const prevTime = new Date(userPreviousPunchedEventsTime).getTime()
 console.log(currentTime, prevTime)
 const totalTime = currentTime - prevTime
 const seconds =  Math.floor((totalTime / (1000 )));
 return seconds;
}