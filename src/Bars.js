import React from 'react';

import Bar from './Bar'

const Bars=({bar_list}) => (
  <div id='bar_container'>{bar_list.map(({id, len, color}) =>
    <Bar key={id} length={len} color={color}/>
  )}</div>
)
export default Bars;