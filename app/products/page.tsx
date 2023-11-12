import { ProductCards } from "@/components/Product/productCards";
import { CategoryNav } from "@/components/CategoryNav/categoryNav";
import { findIndex } from "@/utils/array";
import "../global.css";
const data1 = [{ label: "Gach men" }, { label: "Gach lot tuong" }];
const data2 = [1, 2, 3, 4, 5, 6];

export default function ProductsPage({ params }: { params: { name: String } }) {
  return (
    <>
      <div
        className="hidden-mobile"
        style={{
          flex: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CategoryNav
          data={data1}
          id={findIndex(data1, params.name)}
        ></CategoryNav>
      </div>
      <div
        style={{
          flex: 7,
        }}
      >
        <ProductCards data={data2}></ProductCards>
      </div>{" "}
    </>
  );
}
