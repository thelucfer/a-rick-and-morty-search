import { createApolloClient } from "@/apollo-client";
import { gql } from "@apollo/client";
import { Search } from "./_components/Search";

import { ApiResponse } from "@/lib/types";

export default async function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  async function search(query: string) {
    const client = createApolloClient();

    if (!query || query === "") {
      return [];
    }

    const { data } = await client.query<ApiResponse>({
      query: gql`
        query {
          characters(filter: { name: "${query}" }) {
            info {
              count
            }
            results {
              name
              image
            }
          }
        }
      `,
    });

    return data.characters.results;
  }

  const data = await search(searchParams?.query ?? "");

  return <Search data={data} />;
}
