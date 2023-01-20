import Wrapper from '../assets/wrappers/StatItem'
const StatItem = ({ count, bgc, color, title, icon }) => {
  return (
    <Wrapper color={color} bgc={bgc}>
      <header>
        <span className='count'>{count}</span>
        <div className='icon'>{icon}</div>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  )
}
export default StatItem
