import { useContext } from "react";
import Formera from "formera-form";
import { FormeraContext } from "./FormeraContext";

export default function useFormera(): Formera {
  const { formera } = useContext(FormeraContext);
  return formera;
}