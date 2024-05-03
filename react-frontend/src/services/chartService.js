import client from "./restClient";
const _ = require("lodash");
const query = async (serviceName) =>
  await client
    .service(serviceName)
    .find({ query: { $limit: 10000, $sort: { createdAt: 1 } } });


const getDaysArray = (start, end) => {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};
const getWeeklyArray = (start, end) => {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 7)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};
const getBiWeeklyArray = (start, end) => {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 14)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};
const getMonthlyArray = (start, end) => {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getMonth() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};
const getQuaterlyArray = (start, end) => {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getMonth() + 3)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};
const getHalfYearlyArray = (start, end) => {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getMonth() + 6)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};
const getYearlyArray = (start, end) => {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getFullYear() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};
const getDecadeArray = (start, end) => {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getFullYear() + 10)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};

const labels = (results, interval) => {
  let labels;
  const data = results.data;
  const start = new Date(data[0]?.createdAt);
  const end = new Date(data[data?.length - 1]?.createdAt);
  const difDays = parseInt((end - start) / (1000 * 60 * 60 * 24), 10);
  // console.log("start", start, "end", end, difDays, total);
  interval = dynaInternal(difDays);

  if (difDays <= 31) {
    labels = getDaysArray(start, end);
  } else if (difDays <= 365) {
    if (interval === "days") labels = getDaysArray(start, end);
    else if (interval === "weeks") labels = getWeeklyArray(start, end);
    else if (interval === "biweekly") labels = getBiWeeklyArray(start, end);
    else if (interval === "monthly") labels = getMonthlyArray(start, end);
    else if (interval === "quaterly") labels = getQuaterlyArray(start, end);
    else if (interval === "halfyearly") labels = getHalfYearlyArray(start, end);
  } else if (difDays >= 365 * 10) {
    labels = getDecadeArray(start, end);
  } else {
    if (interval === "days") labels = getDaysArray(start, end);
    else if (interval === "weeks") labels = getWeeklyArray(start, end);
    else if (interval === "biweekly") labels = getBiWeeklyArray(start, end);
    else if (interval === "monthly") labels = getMonthlyArray(start, end);
    else if (interval === "quaterly") labels = getQuaterlyArray(start, end);
    else if (interval === "halfyearly") labels = getHalfYearlyArray(start, end);
    else if (interval === "yearly") labels = getYearlyArray(start, end);
  }

  return labels;
};

const dynaInternal = (diffDays) => {
  let interval = "days";
  switch (diffDays) {
    case diffDays < 31:
      break;
    case diffDays < 63:
      interval = "weekly";
      break;
    case diffDays < 126:
      interval = "monthly";
      break;
    case diffDays < 190:
      interval = "monthly";
      break;
    case diffDays < 316:
      interval = "monthly";
      break;
    default:
      interval = "yearly";
  }
  return interval;
};

const pieCharter = (field, data) => {
  const values = data.map((m) => m[field]);
  const classes = new Set(values);
  let sets = {};
  classes.forEach(async (set) => {
    sets[set] = data.reduce(
      (acc, val) => (val[field] === set ? acc + 1 : acc),
      0
    );
  });
  // console.log(sets);
  return sets;
};

const ChartService = async (serviceName, interval, fields) => {
  let datasets = {};
  const results = await query(serviceName);
  const theLabels = labels(results, interval);
  const total = results.total;
  const data = results.data;
  const start = new Date(data[0]?.createdAt);
  const end = new Date(data[data?.length - 1]?.createdAt);
  const difDays = parseInt((end - start) / (1000 * 60 * 60 * 24), 10);
  const isValue = (val) => {
    return val && typeof val === "number";
  };

  if (difDays <= 31) interval = "days";

  fields.forEach((field) => {
    const max = data.every((v) => isValue(v[field]))
      ? data.reduce(
          (acc, val) => (isValue(val[field]) ? acc + val[field] : acc),
          0
        )
      : pieCharter(field, data);

    let points = [];
    let counter = [];
    theLabels.forEach((endDate) => {
      const condition = (e) =>
        new Date(e?.createdAt).getDate() === endDate.getDate() &&
        new Date(e?.createdAt).getMonth() === endDate.getMonth() &&
        new Date(e?.createdAt).getFullYear() === endDate.getFullYear();
      const idx = data.filter((e) => condition(e));
      const agg = data.reduce((acc, val) => {
        return isValue(val[field]) && new Date(val?.createdAt) <= endDate
          ? acc + val[field]
          : acc;
      }, 0);

      counter.push(idx.length);
      points.push(agg);
    });

    datasets[field] = {
      accumulated: max,
      points: points,
      counter: counter,
      total: total,
    };
  });

  console.log(datasets);

  return {
    datasets,
    labels: theLabels.map((dt) => {
      const ndt = new Date(dt);
      return ndt.toLocaleDateString();
    }),
  };
};

export { ChartService };
