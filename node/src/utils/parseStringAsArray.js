export default function arrayAsString(arr){
  return arr.split(',').map(item => item.trim());
}
