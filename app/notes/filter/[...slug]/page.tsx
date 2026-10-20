import NotesPage from "./Notes.client";
import { fetchNotes } from "../../../../lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface PageProps {
  params: {
    slug: string[];
  };
}

export default async function Page({ params }: PageProps) {
  const queryClient = new QueryClient();
  const page = 1;
  const searchQuery = "";
  const { slug = [] } = await params;
  const tag = slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchQuery, tag, page],
    queryFn: () => fetchNotes(searchQuery, tag, page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPage tag={tag} />
    </HydrationBoundary>
  );
}
