import React, { ReactNode } from 'react'

type FallbackRender = (props: {error: Error | null}) => React.ReactElement
// class 写法接受2个参数，props 和 state, props中有 children 和 fallbackRender,children就是子组件，
// fallbackrender 就是异常处理函数
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender: FallbackRender}>, {error: Error | null}> {
    state = {error: null}

    // 当子组件抛出异常，这里会接收到，并且会调用
    static getDerivedStateFromError(error: Error) {
        return {error}
    }

    render() {
        const {error} = this.state;
        const {fallbackRender, children} = this.props;
        if(error) {
            return fallbackRender({error})
        }
        return children
    }
}