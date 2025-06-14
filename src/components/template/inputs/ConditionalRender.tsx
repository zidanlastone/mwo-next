import React, { PropsWithChildren } from 'react'

function ConditionalRender({ condition = false, children }: PropsWithChildren<{ condition: boolean }>) {
  if (condition) {
    return children
  }
  return null
}

export default ConditionalRender