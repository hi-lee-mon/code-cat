export function isString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("不正な文字列");
  }
}
