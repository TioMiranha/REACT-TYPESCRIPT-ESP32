import { AccordionItem } from "../../components/AccordionItem";
import { Container } from "../../components/Container";
import { ModalConfig } from "../../configs/ModalConfig";

export function HomeConfig() {
  return (
    <Container>
      <AccordionItem title='RTD'>
        <ModalConfig />
      </AccordionItem>
    </Container>
  );
}