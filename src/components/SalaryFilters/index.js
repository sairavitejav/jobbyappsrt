import './index.css'

const SalaryFilters = props => {
  const {eachSalary, onClickRadioItem} = props
  const {label, salaryRangeId} = eachSalary
  const onSelectRadio = () => {
    onClickRadioItem(salaryRangeId)
  }
  return (
    <li className="salary-filters">
      <input
        onChange={onSelectRadio}
        type="radio"
        id={salaryRangeId}
        name="salary"
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}
export default SalaryFilters
