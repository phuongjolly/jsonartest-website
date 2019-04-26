import React from 'react';

export default function CustomSelection({ data, handleFuc }) {
  return (
    <div className="input-group">
      <select
        className="custom-select"
        onChange={e => handleFuc(e.target.value)}
      >
        {
          data && data.length > 0
          && data.map(item => (
            <option
              value={item}
              key={item}
            >
              {item}
            </option>
          ))
        }
      </select>
    </div>
  );
}
