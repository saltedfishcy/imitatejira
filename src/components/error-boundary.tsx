import React, { ReactNode } from 'react'

type FallbackRender = (props: {error: Error | null}) => React.ReactElement
// class 写法接受2个参数，props 和 state, props中有 children 和 fallbackRender,children就是子组件，
// fallbackrender 就是异常处理函数
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender: FallbackRender}>, {error: Error | null}> {

}