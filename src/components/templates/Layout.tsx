import React from 'react'

import { useAuth } from '@/lib/authContext'
import { Header } from '@/components/organisms/Header'
import { Main } from '@/components/organisms/Main'
import { Footer } from '@/components/organisms/Footer'

type Props = {
  children: React.ReactNode
}

export const Layout: React.VFC<Props> = React.memo((props) => {
  const { currentUser, signOut } = useAuth()
  return (
    <>
      <div className="container mx-auto max-w-7xl flex flex-col h-screen">
        <pre>{JSON.stringify(currentUser)}</pre>
        <Header currentUser={currentUser} signOut={signOut} />
        <Main>{props.children}</Main>
        <Footer />
      </div>
    </>
  )
})
