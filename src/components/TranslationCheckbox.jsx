// nameC = Chinese name, nameE = English name
export const TranslationCheckbox = ({nameC, nameE, checked, onChange}) => (
  <div>
    <input 
      type="checkbox"
      id={nameE}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={nameE}>{nameC}</label>
  </div>
)