import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { Gutter } from "../../_components/Gutter";
import { Blocks } from "../../_components/Blocks";
import { Hero } from "../../_components/Hero";
import Categories from "../../_components/Categories";

import { Category, Page as PageProps } from "../../../payload/payload-types";
import { staticHome } from "../../../payload/seed/home-static";

import { generateMeta } from "../../_utilities/generateMeta";

import { fetchDoc } from "../../_api/fetchDoc";
import { fetchDocs } from "../../_api/fetchDocs";

import classes from "./index.module.scss";

export const dynamic = "force-dynamic";

export default async function Page({ params: { slug = "home" } }) {
  const { isEnabled: isDraftMode } = draftMode();

  let page: PageProps | null = null;
  let categories: Category[] | null = null;

  try {
    page = await fetchDoc<PageProps>({
      collection: "pages",
      slug,
      draft: isDraftMode,
    });

    categories = await fetchDocs<Category>("categories");
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }

  if (!page && slug === "home") {
    page = staticHome;
  }

  if (!page) {
    return notFound();
  }

  const { hero, layout } = page;

  return (
    <>
      {slug === "home" ? (
        <section>
          <Hero {...hero} />

          <Gutter className={classes.home}>
            <Categories categories={categories} />
          </Gutter>
        </section>
      ) : (
        <>
          <Hero {...hero} />
          <Blocks
            blocks={layout}
            disableTopPadding={
              !hero || hero?.type === "none" || hero?.type === "lowImpact"
            }
          />
        </>
      )}
    </>
  );
}

export async function generateStaticParams() {
  try {
    const pages = await fetchDocs<PageProps>("pages");
    return pages?.map(({ slug }) => slug);
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params: { slug = "home" },
}): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode();

  let page: PageProps | null = null;

  try {
    page = await fetchDoc<PageProps>({
      collection: "pages",
      slug,
      draft: isDraftMode,
    });
  } catch (error) {}

  if (!page && slug === "home") {
    page = staticHome;
  }

  return generateMeta({ doc: page });
}
