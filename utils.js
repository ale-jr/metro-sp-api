import { statuses } from "./consts.js";
export const toTitleCase = (text = "") =>
  text
    .toLowerCase()
    .split(" ")
    .map((word) => {
      const letters = word.split("");
      letters[0] = letters[0].toUpperCase();
      return letters.join("");
    })
    .join(" ");

export const getOperationStatus = (statusFromApi = "") => {
  const statusKey = Object.keys(statuses).find((status) =>
    statusFromApi.toLowerCase().includes(status)
  );
  const status = statuses[statusKey];
  return status;
};
