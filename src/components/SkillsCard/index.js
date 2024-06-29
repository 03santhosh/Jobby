import './index.css'

const SkillsCard = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  // console.log(name)
  return (
    <li className="skill-list-card">
      <div className="skill-list-container">
        <img className="skill-list-img" src={imageUrl} alt={name} />
        <p className="skill-list-name">{name}</p>
      </div>
    </li>
  )
}

export default SkillsCard
