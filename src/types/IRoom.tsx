interface IRoom {
  match: IMatch;
  locaton: object;
  history: object;
  staticContext: object | undefined;
}

interface IMatch {
  isExact: boolean;
  params: IParams;
  path: string;
  url: string;
}

interface IParams {
  room: string;
}

export default IRoom;
