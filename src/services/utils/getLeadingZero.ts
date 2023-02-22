export default function getLeadingZero(value: number) {
  return String(value).length === 1 ? `0${value}` : String(value);
}
