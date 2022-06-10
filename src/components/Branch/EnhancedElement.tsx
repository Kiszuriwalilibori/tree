import Enhanced from '../../HOCs/enhanced';
import BasicNode from '../common/BasicNode';

const EnhancedElement = Enhanced(BasicNode, 'wrapper-secondary', 'wrapper-secondary-outer', 'distancer');

export default EnhancedElement;
