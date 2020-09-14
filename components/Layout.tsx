import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import stylesheet from 'antd/dist/antd.min.css'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <>
    <Head>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/contracts">
          <a>Contracts List</a>
        </Link>{' '}
        |{' '}
        <Link href="/parties">
          <a>Parties List</a>
        </Link>{' '}
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>@LucasRichter</span>
    </footer>
  </>
)

export default Layout
