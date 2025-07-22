import './styles/theme.css';
import './styles/global.css';
import { Menu } from './components/Menu';
import { ContainerHead } from './components/ContainerHead';
import { Container } from './components/Container';
import { HomeConfig } from './page/HomeConfig';

export function App() {
  return (
    <>
      <ContainerHead>
        <Menu />
      </ContainerHead>

      <Container>
        <HomeConfig />
      </Container>
    </>
  )
}

