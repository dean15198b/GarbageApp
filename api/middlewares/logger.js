const NS_PER_SEC = 1e9; //  convert to nanoseconds

const NS_TO_MS = 1e6; // convert to milliseconds

const getActualRequestDurationInMilliseconds = (start) => {
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const getDateForPrint = (date) =>
  `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

const logger = (req, res, next) => {
  let formatted_date = getDateForPrint(new Date());
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
  const startTime = process.hrtime();
  const durationInMilliseconds =
    getActualRequestDurationInMilliseconds(startTime);
  let log = `[${formatted_date}] ${method}:${url} ${status} ${durationInMilliseconds.toLocaleString()} ms`;
  console.log(log);
  next();
};

export default logger;
