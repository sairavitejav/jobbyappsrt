import './index.css'

const JobSkills = props => {
  const {eachSkill} = props
  const {name, imageUrl} = eachSkill
  return (
    <li className="each-skill">
      <img className="skill-image" src={imageUrl} alt={name} />
      <p className="skill-name">{name}</p>
    </li>
  )
}
export default JobSkills
