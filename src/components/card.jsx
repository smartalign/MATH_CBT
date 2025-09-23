import React from 'react'
import './card.css'

const card = ({children, className, onclick}) => {
  return (
    <article className={`card ${className}`} onClick={onclick}>
        {children}
    </article>
  )
}

export default card
