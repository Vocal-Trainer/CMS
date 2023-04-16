import { CropperAspectRatio } from "../components";

export enum AspectRatio {
  FourToOne = 1,
  FourToThree,
  OneToOne,
  TwoToOne,
  ThreeToTwo,
  SixteenToNine,
  NineNineteen,
  Free,
}

export const aspectRatiosList: CropperAspectRatio[] = [
  { ratioName: AspectRatio.FourToThree, display: "4/3", aspect: 4 / 3 },
  { ratioName: AspectRatio.FourToOne, display: "4/1", aspect: 4 / 1 },
  { ratioName: AspectRatio.OneToOne, display: " 1/1", aspect: 1 / 1 },
  { ratioName: AspectRatio.TwoToOne, display: " 2/1", aspect: 2 / 1 },
  { ratioName: AspectRatio.ThreeToTwo, display: " 3/2", aspect: 3 / 2 },
  { ratioName: AspectRatio.SixteenToNine, display: " 16/9", aspect: 16 / 9 },
  {
    ratioName: AspectRatio.NineNineteen,
    display: "9/19.5",
    aspect: 9 / 19.5,
  },
  {
    ratioName: AspectRatio.Free,
    display: "Free",
    aspect: undefined,
  },
];

export const getRatioByTitle = (ratioName: AspectRatio) => {
  return aspectRatiosList.find(x => x.ratioName === ratioName);
};
