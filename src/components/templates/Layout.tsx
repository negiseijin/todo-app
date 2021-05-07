import { Footer } from '@/components/organisms/Footer'
import { Header } from '@/components/organisms/Header'
import { Main } from '@/components/organisms/Main'
import { useAuth } from '@/lib/authContext'

import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export const Layout: React.VFC<Props> = React.memo(({ children }) => {
  const { currentUser, signOut } = useAuth()
  const router = useRouter()

  const logOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <>
      <div className="container mx-auto max-w-7xl flex flex-col h-screen">
        {currentUser && <Header currentUser={currentUser} logOut={logOut} />}
        <Main>{children}</Main>
        <Footer />
      </div>
    </>
  )
})
