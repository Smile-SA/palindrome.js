import { generatePalindromeViews } from "../../dev/dev-index";

export const createMultipleViewPorts = ({... args}) => {
    const grid = generatePalindromeViews(args, false, null, true)
    return grid;
};
