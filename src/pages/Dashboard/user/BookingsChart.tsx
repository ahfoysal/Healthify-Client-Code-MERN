/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface BookingsChartProps {
  delivered: number;
  cancelled: number;
  pending: number;
}

const COLORS = ['#00A76F', '#FF3030', '#F5A524'];

export default class BookingsChart extends PureComponent<BookingsChartProps> {
  render() {
    const { delivered, cancelled, pending } = this.props;

    const data = [
      { name: 'Delivered', value: delivered },
      { name: 'Cancelled', value: cancelled },
      { name: 'Pending', value: pending },
    ];

    const total = delivered + cancelled + pending;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={129}
            outerRadius={140}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <text
            fill="#919EAB"
            x="50%"
            fontSize={14}
            y="44%"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Total
          </text>
          <text
            fill="#fff"
            x="50%"
            fontWeight={600}
            fontSize={30}
            y="56%"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {total}
          </text>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

const CustomTooltip = ({ payload }: any) => {
  if (!payload || payload.length === 0) {
    return null;
  }

  const { name, value } = payload[0];

  return (
    <div className="backdrop-blur-sm bg-black/30 px-2 py-1 rounded-lg text-xs ">
      <p>{`${name}  ${value}`}</p>
    </div>
  );
};
