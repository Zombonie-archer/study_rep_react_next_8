import NotesPage from "./Notes.client";
import { fetchNotes } from "../../../../lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

interface PageProps {
  params: {
    slug: string[];
  };
}

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: NotesPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug?.[0] === "all" ? "All notes" : slug?.[0] || "All notes";

  return {
    title: `Note - ${tag}`,
    description: `Filtered note list by tag ${tag}`,
    openGraph: {
      title: `Note - ${tag}`,
      description: `Filtered note list by tag ${tag}`,
      url: `https://study_rep_react_next_8.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub note list",
        },
      ],
    },
  };
};

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
