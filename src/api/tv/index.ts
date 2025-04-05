import { BTV } from "./btv";
import { Nova } from "./nova";
import { ITV } from "./types";

const TV: Record<string, ITV> = {
  [BTV.name]: BTV,
  [Nova.name]: Nova,
};

export const getAllTv = (): ITV[] => Object.values(TV);
export const getTv = (tvName: string): ITV | undefined => TV[tvName];
