/**Return the correct value from onChange. */
export function getEventValue(eventOrValue: any){
  if(eventOrValue?.target){
    return eventOrValue.target.value;
  }else{
    return eventOrValue;
  }
}