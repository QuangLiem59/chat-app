const useDuration = (ms: number): string => {
  let seconds: string | number = (ms / 1000).toFixed(0);
  let minutes: string | number = (ms / (1000 * 60)).toFixed(0);
  let hours: string | number = (ms / (1000 * 60 * 60)).toFixed(0);
  let days: string | number = (ms / (1000 * 60 * 60 * 24)).toFixed(0);
  if (+seconds < 60) return "1" + " Min";
  else if (+minutes < 60) return minutes + " Min";
  else if (+hours < 24) return hours + " Hrs";
  else return days + " Days";
};

export default useDuration;
