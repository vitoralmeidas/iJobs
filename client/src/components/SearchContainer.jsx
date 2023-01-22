import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useState, useMemo } from 'react'

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')
  const [localSearchCom, setLocalSearchCom] = useState('')
  const {
    isLoading,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters
  } = useAppContext()

  const handleSearch = e => {
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLocalSearch('')
    setLocalSearchCom('')
    clearFilters()
  }

  const debounce = () => {
    let timeoutID
    return e => {
      setLocalSearch(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value })
      }, 1000)
    }
  }

  const secondDebouce = () => {
    let timeoutID
    return e => {
      setLocalSearchCom(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value })
      }, 1000)
    }
  }

  const optimizedDebounce = useMemo(
    () => debounce(),
    // eslint-disable-next-line
    []
  )
  const optimizedSecondDebouce = useMemo(
    () => secondDebouce(),
    // eslint-disable-next-line
    []
  )

  return (
    <Wrapper>
      <form className='form'>
        <h4>search</h4>
        <div className='form-center'>
          {/* search position */}
          <FormRow
            labelText='Position'
            type='text'
            name='search'
            value={localSearch}
            handleChange={optimizedDebounce}
          />

          {/* search position */}
          <FormRow
            type='text'
            name='searchCompany'
            value={localSearchCom}
            handleChange={optimizedSecondDebouce}
            labelText='Company'
          />

          {/* status */}
          <FormRowSelect
            list={['all', ...statusOptions]}
            handleChange={handleSearch}
            name='searchStatus'
            value={searchStatus}
            labelText='job status'
          />

          {/* job type */}
          <FormRowSelect
            list={['all', ...jobTypeOptions]}
            handleChange={handleSearch}
            name='searchType'
            value={searchType}
            labelText='job type'
          />

          {/* Sort*/}
          <FormRowSelect
            list={sortOptions}
            handleChange={handleSearch}
            name='sort'
            value={sort}
            labelText='sort'
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default SearchContainer
