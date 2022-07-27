import { ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts'

const PieChartComponent = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#EC6B56', '#FF69B4', '#d7b4f3', '#9BBFE0', '#E8A09A', '#4CBB17', '#C6D68F'];
  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + (radius * Math.cos(-midAngle * RADIAN));
    const y = cy + (radius * Math.sin(-midAngle * RADIAN));

    const text = (percent * 100).toFixed(0)
    let textSize = 14
    if (text < 10) textSize = 0
    if (text > 10 && text < 20) textSize = 8
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'middle' : 'middle'} dominantBaseline="central" fontSize={textSize} fontWeight={600}>
        {`${text}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart width={100} height={100}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={65}
          fill="#8884d8"
          dataKey="value"
          key={Math.random()}
          animationDuration={750}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartComponent