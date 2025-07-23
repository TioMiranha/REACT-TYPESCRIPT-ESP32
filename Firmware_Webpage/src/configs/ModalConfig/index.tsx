import { AccordionItemChild } from "../../components/AccordionItemChild";
import { Container } from "../../components/Container";
import { Input } from "../../components/Input";


//import style from './style.module.css';

export function ModalConfig() {
  return (
    <Container>
      <AccordionItemChild title="Tag 1">

        <Input id={"Tag1"} labelText={"Digite um valor"} type="text" placeholder="" />
        <Input id={"Io"} labelText={"Digite outro valor"} type="text" placeholder="" />
        <Input id={"Tag1"} labelText={"Digite um valor"} type="text" placeholder="" />
        <Input id={"Io"} labelText={"Digite outro valor"} type="text" placeholder="" />
        <Input id={"Tag1"} labelText={"Digite um valor"} type="text" placeholder="" />

      </AccordionItemChild >
    </Container>

  );
}