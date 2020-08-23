import useSWR from 'swr';
import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, VerticalBarSeriesCanvas, LabelSeries, DiscreteColorLegend, LineSeries } from 'react-vis';

import { fetcher } from './trait';
import { CarType } from '../api/cars/sales';

function massage(list, filter) {
  const data = list.filter((item) => item.type === filter);
  return data.map((item) => ({ x: item.date, y: item.sale })).sort((a, b) => a.x.localeCompare(b.x));
}

const ITEMS = [
  'Electric Car',
  'Gas Car',
];

export default function SalesChart() {
  const { data, error } = useSWR('/api/cars/sales', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading</div>;
  const electricCarData = massage(data, CarType.Electric);
  const gasCarData = massage(data, CarType.Gas);
  const sumData = electricCarData.map((item, ind) => ({x: item.x, y: item.y + gasCarData[ind].y}))
  return (
    <div>
      <div>
        <DiscreteColorLegend height={80} width={200} items={ITEMS} />
        <XYPlot xType="ordinal" width={1200} height={300} xDistance={100}>
          <YAxis />
          <XAxis />
          <VerticalBarSeries className="vertical-bar-series-example" data={electricCarData} />
          <VerticalBarSeries data={gasCarData} />
        </XYPlot>
      </div>
      <div>
        <DiscreteColorLegend height={80} width={200} items={ITEMS} />
        <XYPlot xType="ordinal" width={1200} height={300} stackBy="y">
          <YAxis />
          <XAxis />
          <VerticalBarSeries className="vertical-bar-series-example" data={electricCarData} />
          <VerticalBarSeries data={gasCarData} />
          <LineSeries className="fourth-series" data={sumData} />
        </XYPlot>
      </div>
    </div>
  );
}
