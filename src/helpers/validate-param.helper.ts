export function validateParam(param: any) {
  return (
    param !== undefined &&
    param !== null &&
    typeof param === "string" &&
    (param as string).replaceAll(" ", "") !== ""
  );
}
