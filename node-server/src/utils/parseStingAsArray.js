export default function parseStringAsArray(stringAsArray){
  return stringAsArray.split(',').map(str => str.trim())
}