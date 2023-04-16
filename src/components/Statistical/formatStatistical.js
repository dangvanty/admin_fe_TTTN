export const formatMonthStatistical = (data, year = 2023) => {
  // data mẫu: [{thang_1:3,thang_2:3....}]
  const formatLabel = Object.keys(data[0]).map((item) => {
    let month = +item.slice(6) < 10 ? `0${item.slice(6)}` : item.slice(6);
    return month + '/01/' + year;
  });

  return formatLabel;
};
export const formatQuantityValueStatistical = (data) => {
  // data mẫu: [{thang_1:3,thang_2:3....}]
  const formatLabel = Object.values(data[0]).map((item) => {
    return +item;
  });

  return formatLabel;
};
