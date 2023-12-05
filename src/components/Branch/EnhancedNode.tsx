import { withEnhancement } from "HOCs";
import { BasicNode } from "../common";

const EnhancedNode = withEnhancement(BasicNode, "wrapper-secondary", "wrapper-secondary-outer", "distancer");

export default EnhancedNode;
