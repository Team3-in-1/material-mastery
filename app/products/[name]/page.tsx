import { ProductCards } from "@/components/Product/productCards";

const data = [1, 2, 3, 4, 5, 6];

export default function ProductsPage({ params }: { params: { name: String } }) {
  return <ProductCards data={data}></ProductCards>;
}
