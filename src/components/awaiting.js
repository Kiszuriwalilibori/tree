import React, { Suspense } from 'react';

const Awaiting = Component => {
    return props => (
        <Suspense fallback={null}>
            <Component {...props} />
        </Suspense>
    );
};
export default Awaiting;
