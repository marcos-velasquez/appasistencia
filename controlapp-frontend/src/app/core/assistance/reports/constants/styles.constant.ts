//@ts-ignore
import { Font, Style } from "exceljs/dist/exceljs.min.js";

const font: Partial<Font> = {
  size: 13,
  color: { argb: "0000000" },
};

export const style: Partial<Style> = {
  alignment: { horizontal: "left", vertical: "middle" },
  font,
  border: {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  },
};
