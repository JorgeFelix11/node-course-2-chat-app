interface IResponseMessage{
  from: string;
  text: string;
  createdAt: number
}
interface ILocationMessage{
  from: string;
  url: string;
  createdAt: number
}
interface IGenerateMessage{
  (from: string, text: string): IResponseMessage
}
interface IGenerateLocationMessage{
  (from: string, latitude: number, longitude: number): ILocationMessage
}
let generateMessage: IGenerateMessage = (from: string, text: string) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  }
}

let generateLocationMessage: IGenerateLocationMessage = (from: string, latitude, longitude): ILocationMessage => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: new Date().getTime()
  }
}
export {generateMessage, IResponseMessage, generateLocationMessage};