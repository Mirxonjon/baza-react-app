const month_return = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };
  

export const convertorDateToDay = (date) => {

    const dateArr = date.split('-');
    let sumDay = +dateArr[2];
  
    for (let i = 1; i <= +dateArr[1]; i++) {
      sumDay += month_return[i];
    }
    let day = sumDay + +dateArr[0] * 365;
    return day;
  };
  