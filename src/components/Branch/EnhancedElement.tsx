import enhanced from "../../HOCs/enhanced";
import BasicNode from "../common/BasicNode";

const EnhancedElement = enhanced(BasicNode, "wrapper-secondary", "wrapper-secondary-outer", "distancer");

export default EnhancedElement;
