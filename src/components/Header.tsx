import React from 'react'

export default function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <h2 className="dark:text-white text-darkmode-900 text-3xl">
      {title}
    </h2>
    {subtitle && <p className="text-darkmode-600">{subtitle}</p>}
  </>
  )
}
