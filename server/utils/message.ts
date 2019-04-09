interface IResponseMessage{
  from: string;
  text: string;
  createdAt: number
}
interface IGenerateMessage{
  (from: string, text: string): IResponseMessage
}
let generateMessage: IGenerateMessage = (from: string, text: string) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  }
}

export {generateMessage, IResponseMessage};