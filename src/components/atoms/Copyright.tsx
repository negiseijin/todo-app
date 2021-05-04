import React from 'react'

type Props = {
  children: React.ReactNode
}

export const Copyright: React.VFC<Props> = React.memo(({ children }) => {
  return (
    <p className="text-center">
      {'Copyright © '}
      {children}
      {new Date().getFullYear()}
      {'.'}
    </p>
  )
})
