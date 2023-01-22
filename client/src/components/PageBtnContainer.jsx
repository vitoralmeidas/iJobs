import { useAppContext } from '../context/appContext'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'

const PageBtnContainer = () => {
  const { numOfPages, page } = useAppContext()

  let pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })

  const prevPage = () => {
    console.log('prev page')
  }
  const nextPage = () => {
    console.log('next page')
  }

  return (
    <Wrapper>
      <button onClick={prevPage} className='prev-btn'>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map(pageNumber => {
          return (
            <button
              type='button'
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              key={pageNumber}
              onClick={() => console.log(page)}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
      <div onClick={nextPage} className='next-btn'>
        <HiChevronDoubleRight />
        next
      </div>
    </Wrapper>
  )
}
export default PageBtnContainer
