import {
  Bar,
  CartesianGrid,
  BarChart,
  Tooltip,
  YAxis,
  XAxis,
  ResponsiveContainer
} from 'recharts'

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid stroke=' 3 3 ' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey='count' fill='#2cb1bc' barSize={85} />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default BarChartComponent
