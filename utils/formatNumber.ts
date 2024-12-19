export default function formatNumber(number: number): string {
  return number.toLocaleString("en-US");
}

// const num = 222111;
// console.log(formatNumber(num)); //222,111
