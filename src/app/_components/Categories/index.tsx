import Link from "next/link";

import CategoryCard from "./CategoryCard";

import { Category } from "../../../payload/payload-types";

import classes from "./index.module.scss";

const Categories = ({ categories }: { categories: Category[] }) => {
  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>Shop By Category</h3>

        <Link href={"/products"}>Show All</Link>
      </div>

      <div className={classes.list}>
        {categories?.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
