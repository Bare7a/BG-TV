import { BTVPlus } from "./btvPlus";
import { NovaPlay } from "./novaPlay";
import { IShow } from "./types";

const SHOWS: Record<string, IShow> = {
  [BTVPlus.showName]: BTVPlus,
  [NovaPlay.showName]: NovaPlay,
};

export const getAllShows = (): IShow[] => Object.values(SHOWS);
export const getShow = (tvName: string): IShow | undefined => SHOWS[tvName];
