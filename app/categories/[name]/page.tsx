import { CategoryCards } from "@/components/CategoryCards/categoryCards";
import { Pagination } from "@mantine/core";
import Pcard from "@/components/Product/pcard";

export default function CategoriesPage({
  params,
}: {
  params: { name: String };
}) {
  return (
    <>
      {params.name == "brick" ? (
        <CategoryCards
          data={[
            { name: "Gạch lót sàn" },
            { name: "Gạch lót sàn" },
            { name: "Gạch lót sàn" },
            { name: "Gạch lót sàn" },
            { name: "Gạch lót sàn" },
          ]}
          category={params.name}
        ></CategoryCards>
      ) : (
        <CategoryCards
          data={[{ name: "Ghế" }]}
          category={params.name}
        ></CategoryCards>
      )}
      {/* <Pcard></Pcard> */}
      <Pagination
        total={20}
        siblings={1}
        defaultValue={10}
        style={{ marginTop: "10px" }}
      />
    </>
  );
}
