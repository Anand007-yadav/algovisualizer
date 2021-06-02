import React from 'react';

const Bar=({length, color}) => (
    <div className='bar' style={{ height: length , backgroundColor: color }}></div>
);
export default Bar;