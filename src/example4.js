import React from 'react';
import * as d3 from 'd3';

class VizExample4 extends React.Component {


    _chartComponents() {

        const { width, height, data } = this.props
        const points = data.map (d => {
            return {
                x: d.locationX,
                y: d.locationY,
                r: d.frequency,
                color: d.accuracy,
                datum: d
            }
        })
        const xDomain = d3.extent(points, d => d.x)
        const yDomain = d3.extent(points, d => d.y)
        const x = d3.scaleLinear().domain(xDomain).range([0, width])
        const y = d3.scaleLinear().domain(yDomain).range([0, height])
        const rDomain = d3.extent(points, d => d.r)
        const numCols = xDomain[1]
        const r = d3.scaleLinear().domain(rDomain)
              .range([0, (width / numCols) / 2 ])
        const color = d3.scaleLinear().domain([0.3, 0.45, 0.6])
              .range(['#0571b0', '#f7f7f7', '#ca0020']).clamp(true)

        return {
            points,
            width,
            height,
            x,
            y,
            r,
            color
        }

    }    

render() {
    const { points, width, height, x, y, r, color } = this._chartComponents();

    return (
      <svg width={width} height={height} className='chart'>
        {points.map((d, i) => {
          return <circle key={i} cx={x(d.x)} cy={y(d.y)}
                         r={r(d.r)} fill={color(d.color)} />;
        })}
      </svg>
    );
  }
    
}

export default VizExample4;
