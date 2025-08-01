//import { AccordionItem } from "../../components/AccordionItem";
import { AccordionItemDad } from "../../components/AccordionItemDad";
import { Container } from "../../components/Container";
import { MainTemplate } from "../../components/templates/MainTemplate";
import { ModalConfig } from "../../configs/ModalConfig";

//import style from './style.module.css'

export function HomeConfig() {
  return (
    <MainTemplate>
      <Container>
        <AccordionItemDad title='RTD'>
          <ModalConfig />
        </AccordionItemDad>
      </Container>
    </MainTemplate >
  );
}