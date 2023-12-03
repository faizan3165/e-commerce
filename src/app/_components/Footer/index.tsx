import FooterComponent from "./FooterComponent";

import { Footer as FooterProps } from "../../../payload/payload-types";
import { fetchFooter } from "../../_api/fetchGlobals";

export async function Footer() {
  let footer: FooterProps | null = null;

  try {
    footer = await fetchFooter();
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }

  const navItems = footer?.navItems || [];

  return (
    <>
      <FooterComponent footer={footer} />
    </>
  );
}
