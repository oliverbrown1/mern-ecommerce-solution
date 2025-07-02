import React from 'react'

const CategoryTabs = ({Cats}) => {
  return (
    <div className="tabs tabs-boxed w-full bg-base-200 z-0">
        <a className="tab tab-lg flex-1">Category 1</a>
        <a className="tab tab-lg flex-1 tab-active">Category 2</a>
        <a className="tab tab-lg flex-1">Category 3</a>
    </div>
  )
}

export default CategoryTabs