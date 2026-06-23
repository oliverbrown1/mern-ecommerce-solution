import React from 'react'

const CategoryTabs = ({categories, selectedCategory, setSelectedCategory}) => {
  return (
    <div className="tabs tabs-boxed w-full rounded-none border-b border-white/10 bg-base-200 px-4 py-3">
          {categories.map((category) => (
          <button 
            key={category} 
            type="button"
            className={`tab tab-lg flex-1 rounded-xl border-0 bg-transparent text-md font-bold capitalize transition-all duration-200 ${
              selectedCategory === category
                ? 'tab-active bg-base-100 text-secondary shadow-md'
                : 'text-base-content/70 hover:bg-base-100/70 hover:text-base-content'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
          ))}
    </div>
  )
}

export default CategoryTabs
