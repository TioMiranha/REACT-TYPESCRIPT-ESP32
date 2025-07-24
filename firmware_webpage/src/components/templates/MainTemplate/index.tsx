import { Container } from "../../Container";
import { ContainerHead } from "../../ContainerHead";
import { Footer } from "../../Footer";

import { Menu } from "../../Menu";

type MainTemplateProps = {
  children: React.ReactNode
}

export function MainTemplate({ children }: MainTemplateProps) {

  return (
    <>
      <ContainerHead>
        <Menu />
      </ContainerHead>

      <Container>
        {children}
      </Container>

      <Container>
        <Footer />
      </Container>
    </>
  );
}