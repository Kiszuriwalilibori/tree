import { withEnhancement } from "HOCs";
import { TextItem } from "../common/TextItem";

export const BranchHeader = withEnhancement(TextItem, "wrapper-secondary");

export default BranchHeader;
