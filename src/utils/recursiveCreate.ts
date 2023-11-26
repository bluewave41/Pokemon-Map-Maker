export const depthCreate = (path: string, obj: any) => {
  const keys = path.split("/");
  let result = obj;

  keys.forEach((key) => {
    if (!result[key]) {
      result[key] = {};
    }
    result = result[key];
  });

  return obj;
};
