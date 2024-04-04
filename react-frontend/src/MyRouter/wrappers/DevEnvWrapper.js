import React from 'react';
import { Tag } from 'primereact/tag';

const DevEnvWrapper = () => {
    if (process.env.ENV && process.env.ENV !== 'prod')
        return (
            <div className="fixed pl-1 pt-1" style={{ top: 0, left: 0, zIndex: 1000 }}>
                <Tag className="mr-2" severity="info" value={process.env.ENV.toUpperCase()} title="environment"></Tag>
            </div>
        );
    return null;
};

export default DevEnvWrapper;
