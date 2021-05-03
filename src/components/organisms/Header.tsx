import React from 'react'
import Link from 'next/link'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'

import { User } from '@/lib/authContext'

type Props = {
  currentUser: User
  logOut: () => Promise<void>
}

export const Header: React.VFC<Props> = React.memo(
  ({ currentUser, logOut }) => {
    return (
      <Popover className="relative bg-white">
        {({ open }) => (
          <>
            <header className="px-4 sm:px-6">
              <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <Link href="/">
                    <a>
                      <span className="sr-only">Workflow</span>
                      <img
                        className="h-8 w-auto sm:h-10"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt=""
                      />
                    </a>
                  </Link>
                </div>

                <div className="-mr-2 -my-2 md:hidden">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                  {!currentUser ? (
                    <>
                      <Link href="/auth">
                        <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                          ログイン
                        </a>
                      </Link>
                      <Link href="/auth">
                        <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                          新規登録
                        </a>
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="text-center text-base font-medium">
                        こんにちは 😊 <br />
                        {currentUser.isAnonymous
                          ? 'ゲスト'
                          : currentUser.displayName}{' '}
                        さん
                      </p>
                      <button
                        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        onClick={logOut}
                      >
                        ログアウト
                      </button>
                    </>
                  )}
                </div>
              </div>
            </header>

            <Transition
              show={open}
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                static
                className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                  <div className="py-6 px-5 space-y-6">
                    {!currentUser ? (
                      <>
                        <Link href="/auth">
                          <a className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            新規登録
                          </a>
                        </Link>
                        <p className="mt-6 text-center text-base font-medium text-gray-500">
                          アカウントをお持ちですか？{' '}
                          <Link href="/auth">
                            <a className="text-indigo-600 hover:text-indigo-500">
                              ログイン
                            </a>
                          </Link>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="mt-6 text-center text-base font-medium text-gray-500">
                          Todoやめますか？🥺
                        </p>
                        <button
                          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                          onClick={logOut}
                        >
                          ログアウト
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    )
  }
)
