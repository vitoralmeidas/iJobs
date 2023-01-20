import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { Loading, ChartsContainer, StatsContainer } from '../../components'

const Stats = () => {
  const { isLoading, showStats, monthlyApplications } = useAppContext()

  useEffect(() => {
    showStats()
  }, [])

  if (isLoading) {
    return <Loading center />
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  )
}
export default Stats
