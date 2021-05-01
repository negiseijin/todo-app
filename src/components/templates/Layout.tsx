import React from 'react'

import { Header } from '@/components/organisms/Header'
import { Main } from '@/components/organisms/Main'
import { Footer } from '@/components/organisms/Footer'

type Props = {
  children: React.ReactNode
}

export const Layout: React.VFC<Props> = React.memo((props) => {
  return (
    <div className="container mx-auto  max-w-7xl flex flex-col h-screen">
      <Header />
      <Main>{props.children}</Main>
      <Footer />
    </div>
  )
})
