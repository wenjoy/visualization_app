import useSWR from 'swr';
import { RadarChart, Hint } from 'react-vis';
import { format } from 'd3-format';
import styles from '../styles/Car.module.css';
import React, { useState } from 'react';

const fetcher = (url) => fetch(url).then((r) => r.json());

const basicFormat = format('.2r');
const wideFormat = format('.3r');

const tipStyle = {
  display: 'flex',
  color: '#fff',
  background: '#000',
  alignItems: 'center',
  padding: '5px',
};

function BasicRadarChart(props) {
  const { data } = props;
  const [hoveredCell, setHoveredCell] = useState({name: ''});
  return (
    <RadarChart
      data={data}
      tickFormat={(t) => wideFormat(t)}
      startingAngle={0}
      domains={[
        { name: 'size', domain: [0, 10], getValue: (d) => d.size },
        {
          name: 'price',
          domain: [2, 10],
          tickFormat: (t) => `$${basicFormat(t)}`,
          getValue: (d) => d.price,
        },
        { name: 'safety', domain: [5, 10], getValue: (d) => d.safety },
        { name: 'interior', domain: [0, 10], getValue: (d) => d.interior },
        { name: 'engine', domain: [2, 10], getValue: (d) => d.engine },
        { name: 'fuelCost', domain: [0, 10], getValue: (d) => d.fuelCost },
      ]}
      width={400}
      height={400}
      onSeriesMouseOver={(data) => {
        setHoveredCell(data.event[0]);
      }}
      onSeriesMouseOut={() => setHoveredCell({name: ''})}
    >
      {hoveredCell && (
        <Hint value={{ x: 0, y: 0 }}>
          <div style={tipStyle}>{hoveredCell.name}</div>
        </Hint>
      )}
    </RadarChart>
  );
}

export default function About() {
  const { data, error } = useSWR('/api/cars', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading</div>;
  return (
    <div className={styles.container}>
      <BasicRadarChart data={data} />
    </div>
  );
}
