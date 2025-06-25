import React from 'react';

const Title = ({title, desing}) => {
    return (
        <div className={`font-dancing text-center ${desing} `}>
            {title}
        </div>
    );
};

export default Title;
