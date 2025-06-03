import React from 'react'

const Card = ({children, className, title}: {children: React.ReactNode, className?: string, title?:string}) => {
  return (
    <div className={`bg-white/70 dark:bg-gray-900/80 rounded-lg shadow p-6 text-gray-900 dark:text-gray-100 ${className}`}>
        {title && (
            <div className="py-2">
                <h3>{title}</h3>
                <hr className="border-1 mt-1" />
            </div>
        )}
      {children}
    </div>
  )
}

export default Card