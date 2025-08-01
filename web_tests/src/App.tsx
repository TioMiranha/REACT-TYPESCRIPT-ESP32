import { MessagesCoontainer } from './components/MessagesCoontainer';
import { MainRouter } from './router/MainRouter';

import './styles/theme.css';
import './styles/global.css';

export function App() {
  return (
    <>
      <MessagesCoontainer>
        <MainRouter />
      </MessagesCoontainer>
    </>
  )
}

