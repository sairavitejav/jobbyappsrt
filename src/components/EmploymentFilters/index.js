import './index.css'

const EmploymentFilters = props => {
  const {eachEmployment, onClickEmployment} = props
  const {label, employmentTypeId} = eachEmployment
  const onSelectEmployement = () => {
    onClickEmployment(employmentTypeId)
  }
  return (
    <li className="employ-filters">
      <input
        onChange={onSelectEmployement}
        id={employmentTypeId}
        type="checkbox"
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}
export default EmploymentFilters
