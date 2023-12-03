"use client";

import Link from "next/link";

import { Category, Media } from "../../../../payload/payload-types";

import classes from "./index.module.scss";
import { useFilter } from "../../../_providers/Filter";

type CategoryCardProps = {
  cat: Category;
};

const CategoryCard = ({ cat }: CategoryCardProps) => {
  const { setCategoryFilters } = useFilter();

  const media = cat.media as Media;

  return (
    <Link
      href={`/products`}
      className={classes.card}
      style={{ backgroundImage: `url(${media.url})` }}
      onClick={() => setCategoryFilters([cat.id])}
    >
      <p className={classes.title}>{cat.title}</p>
    </Link>
  );
};

export default CategoryCard;
