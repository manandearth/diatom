import React, { useEffect } from 'react';
import * as d3 from 'd3';

const Graphics = (props) => {
  useEffect(() => {
   d3.select('.viz > *').remove();
   draw(props)
 }, [props, props.shapes.length])
  return <div className="graphics" />
}


const draw = (props) => {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    d3.select('.viz').append('svg')
      .attr('height', h)
      .attr('width', w)
      .attr('id', 'svg-viz')


const squares = d3.select('#svg-viz').selectAll('rect')
		  .data(props.shapes)
		  .enter()
		  .append('svg:rect')
		  .style('fill', (d) => d.color ? d.color : 'purple')
