import { useEffect } from "react"

const Dashboard = () => {
  const fetchData = async () =>{
    // const res = await fetchData('/data.json')
    const res = await fetch('/api/v1')
    const data = await res.json()
    console.log(data)
  }

  useEffect(() =>{
    fetchData()
  }, [])
  return (
    <h1>
        Dashboard
    </h1>
  )
}
export default Dashboard