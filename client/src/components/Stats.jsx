import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import Loading from './Loading'

const Stats = () => {
  const { isLoading, showStats, monthlyApplications } = useAppContext()

  useEffect(() => {
    showStats()
  }, [])

  if (isLoading) {
    return <Loading center />
  }

  return <div>Stats</div>
}
export default Stats
