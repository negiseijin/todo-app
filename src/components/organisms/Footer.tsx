import React from 'react'

import { Copyright } from '@/components/atoms/Copyright'

export const Footer: React.VFC = React.memo(() => {
  return (
    <>
      <footer className="border-t-2 border-gray-100 py-4 sm:py-6 px-4 sm:px-6 text-gray-500">
        <Copyright />
      </footer>
    </>
  )
})
