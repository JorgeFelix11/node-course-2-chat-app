interface IResponseMessage{
  from: string | undefined;
  text: string | undefined;
  createdAt: number
}
interface ILocationMessage{
  from: string | undefined;
  url: string;
  createdAt: number
}
interface IGenerateMessage{
  (from: string | undefined, text: string | undefined): IResponseMessage
}
interface IGenerateLocationMessage{
  (from: string | undefined, latitude: number, longitude: number): ILocationMessage
}
let generateMessage: IGenerateMessage = (from: string | undefined, text: string | undefined) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  }
}

let generateLocationMessage: IGenerateLocationMessage = (from: string | undefined, latitude, longitude): ILocationMessage => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: new Date().getTime()
  }
}
export {generateMessage, IResponseMessage, generateLocationMessage};