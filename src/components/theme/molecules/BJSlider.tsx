import { Slider, Typography } from "antd";
import { SliderRangeProps } from "antd/lib/slider";
import { BJFormLabelInfo } from "../atoms/BJInfo";

export const BJSlider = (
  props: SliderRangeProps & {
    extra?: string;
    showInfo?: boolean;
    selectedRange?: [number, number];
  }
) => {
  return (
    <>
      <BJFormLabelInfo label={"Select range"} info={props.extra} />
      <Slider
        {...props}
        marks={props.selectedRange?.reduce(
          (a: { [key: number]: number }, c: number) => ({
            ...a,
            [c]: c,
          }),
          {}
        )}
      />
      {!props.showInfo && props.extra && (
        <Typography.Paragraph type="warning">
          {props.extra}
        </Typography.Paragraph>
      )}
    </>
  );
};
