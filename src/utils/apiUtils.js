export const asyncLocalStorage = {
  async setItem(key, value) {
    return Promise.resolve().then(function () {
      JSON.stringify(localStorage.setItem(key, value));
    });
  },
  async getItem(key) {
    return Promise.resolve().then(function () {
      return JSON.parse(localStorage.getItem(key));
    });
  },
};

export function isDateBetween(startDate, endDate) {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const target = `${day}/${month}/${year}`;
  return target >= startDate && target <= endDate;
}
