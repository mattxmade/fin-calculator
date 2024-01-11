// String.replaceAll method does not exist on the 'string' data type
// https://stackoverflow.com/a/17606289

export default function generateLabelName(string: string) {
  return string.trim().toLowerCase().split(" ").join("-");
}
