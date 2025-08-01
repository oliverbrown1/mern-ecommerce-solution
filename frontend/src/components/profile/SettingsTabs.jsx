import React from 'react'

const SettingsTabs = ({name, value, onClick}) => {
  return (
    <input
        type="radio"
        name="theme-buttons"
        className="btn join-item text-lg"
        aria-label={name}
        value={value}
        // checked={activeIndex === value}
        onChange={onClick}
    />
  )
}

export default SettingsTabs