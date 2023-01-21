import { useState } from 'react'
import { useAppContext } from '../context/appContext'
import BarChartComponent from './BarChart'
import AreaChartComponent from './AreaChart'
import Wrapper from '../assets/wrappers/ChartsContainer'

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true)
  const { monthlyApplications: data } = useAppContext()

  return (
    <Wrapper>
      <h4>Monthly Applicaitons</h4>

      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  )
}
export default ChartsContainer
