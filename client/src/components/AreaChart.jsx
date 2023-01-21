import {
  ResponsiveContainer,
  Area,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
  AreaChart
} from 'recharts'
const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type='monotone' dataKey='count' stroke='#000' fill='#bef8fd' />
      </AreaChart>
    </ResponsiveContainer>
  )
}
export default AreaChartComponent
