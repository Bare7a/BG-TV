export interface ITV {
  tvName: string;
  getTvUrl: () => Promise<string>;
}
