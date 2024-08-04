export const generateUniqueId = (): number => {
  return Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
};
