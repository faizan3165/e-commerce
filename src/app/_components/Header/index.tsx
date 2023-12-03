import React from "react";
import Link from "next/link";

import { Header as HeaderProps } from "../../../payload/payload-types";
import { fetchHeader } from "../../_api/fetchGlobals";
import HeaderComponent from "./HeaderComponent";

export async function Header() {
  let header: HeaderProps | null = null;

  try {
    header = await fetchHeader();
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <HeaderComponent header={header} />
    </>
  );
}
