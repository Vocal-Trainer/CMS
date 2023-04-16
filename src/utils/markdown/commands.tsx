import { ICommand } from "@uiw/react-md-editor";

const offerTop: ICommand = {
  name: "OfferTop",
  keyCommand: "offertop",
  buttonProps: { "aria-label": "Offer Top", name: "Offer Top" },
  icon: <div style={{ fontSize: "14px" }}>Offer Top</div>,
  execute: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: { selectedText: any },
    api: { replaceSelection: (arg0: string) => void }
  ) => {
    let modifyText =
      `${state.selectedText}` +
      `

    \n<offer-top/>`;

    if (!state.selectedText) {
      modifyText = `

      \n<offer-top/>\n`;
    }
    api.replaceSelection(modifyText);
  },
};

const offerBottom: ICommand = {
  name: "OfferBottom",
  keyCommand: "offerbottom",
  buttonProps: { "aria-label": "Offer Bottom", name: "Offer Bottom" },
  icon: <div style={{ fontSize: "14px" }}>Offer Bottom</div>,
  execute: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: { selectedText: any },
    api: { replaceSelection: (arg0: string) => void }
  ) => {
    let modifyText =
      `${state.selectedText}` +
      `

    \n<offer-bottom/>`;

    if (!state.selectedText) {
      modifyText = `

      \n<offer-bottom/>\n`;
    }
    api.replaceSelection(modifyText);
  },
};

export default {
  offerTop,
  offerBottom,
};
