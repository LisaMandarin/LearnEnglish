export function Hint({json}) {
    return (
      <ul>
        {json.map((hint, index) => (
          <li key={index}>{hint}</li>
        ))}
      </ul>
    )
  }