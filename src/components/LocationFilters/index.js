import './index.css'

const LocationFilters = props => {
  const {eachLocation, onchangeLocation} = props
  const {locationId, label} = eachLocation
  const onSelectLocation = () => {
    onchangeLocation(label)
  }

  return (
    <li className="location-filters">
      <input onChange={onSelectLocation} id={locationId} type="checkbox" />
      <label htmlFor={locationId}>{label}</label>
    </li>
  )
}
export default LocationFilters
