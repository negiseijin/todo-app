import React from 'react'

type Props = {
  children: React.ReactNode
}

export const Main: React.VFC<Props> = React.memo(({ children }) => {
  return <main className="flex-grow py-4 sm:py-6 px-4 sm:px-6">{children}</main>
})
