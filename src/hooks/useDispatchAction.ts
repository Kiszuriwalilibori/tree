import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux';

const useDispatchAction = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actionCreators, dispatch);
};

export default useDispatchAction;
