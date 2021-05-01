import React from 'react'

export const Copyright: React.VFC = React.memo(() => {
  return (
    <p className="text-center">
      {'Copyright © '}
      Satoru Takahashi{new Date().getFullYear()}
      {'.'}
    </p>
  )
})
