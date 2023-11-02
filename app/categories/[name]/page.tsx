import { CategoryCards } from "@/components/CategoryCards/categoryCards";
import { Flex, Pagination } from "@mantine/core";

export default function CategoriesPage({
  params,
}: {
  params: { name: String };
}) {
  return (
    <Flex direction={"column"}>
      <Flex>
        {params.name == "brick" ? (
          <CategoryCards
            data={[
              { name: "Gạch lót sàn" },
              { name: "Gạch lót sàn" },
              { name: "Gạch lót sàn" },
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
      </Flex>

      <Flex
        align={"center"}
        justify={"center"}
        className="hidden-mobile"
        style={{ marginBottom: "20px", marginTop: "20px" }}
      >
        <Pagination total={20} siblings={1} defaultValue={10} />
      </Flex>
    </Flex>
  );
}
