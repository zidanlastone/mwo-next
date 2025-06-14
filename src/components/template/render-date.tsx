import React from 'react'

const RenderDate = ({date}: {date?: Date}) => {
  let d = new Date(date as Date);
  
  if(!date){
    return null
  }

  return (
    <>{d.toLocaleDateString()} {d.toLocaleTimeString()}</>
  )
}

export default RenderDate