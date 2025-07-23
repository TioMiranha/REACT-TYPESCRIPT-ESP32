import { AccordionItem } from "../../components/AccordionItem";
import { Container } from "../../components/Container";
import { MainTemplate } from "../../components/templates/MainTemplate";
import { ModalConfig } from "../../configs/ModalConfig";

//import style from './style.module.css'

export function HomeConfig() {
  return (
    <MainTemplate>
      <Container>
        <AccordionItem title='RTD'>
          <ModalConfig />
        </AccordionItem>
      </Container>
    </MainTemplate >
  );
}