/**
 * HOC which takes component and enhances it by wraping with more components
 * @param Component basic component which is subject to enhancing
 * @param classInner inner wrapper class
 * @param classOuter outer wrapper class
 * @param distancer renders horizontal line to the left of enhanced component
 * @returns enhanced component
 */

const Enhanced = (Component: any, classInner = '', classOuter = '', distancer = '') => {
    return (props: any) => (
        <div className={classOuter}>
            <div className={distancer}></div>
            <div className={classInner}>
                <Component {...props} />
            </div>
        </div>
    );
};
export default Enhanced;
