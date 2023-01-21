import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters,
    searchCompany
  } = useAppContext()

  const handleSearch = e => {
    if (isLoading) return
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    clearFilters()
  }

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
            value={search}
            handleChange={handleSearch}
          />

          {/* search position */}
          <FormRow
            type='text'
            name='searchCompany'
            value={searchCompany}
            handleChange={handleSearch}
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
