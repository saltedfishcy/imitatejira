import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthenticatedApp } from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'
import { useAuth } from './context/auth.context'
import {ErrorBoundary} from './components/error-boundary'
import { FullpageErrorFallback } from './components/lib';

function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullpageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
