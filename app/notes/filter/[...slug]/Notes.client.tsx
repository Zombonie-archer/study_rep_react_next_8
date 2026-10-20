"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";
import type { Note } from "@/types/note";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

interface NotesPageProps {
  tag: string;
}

function NotesPage({ tag }: NotesPageProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", searchQuery, tag, page],
    queryFn: () => fetchNotes(searchQuery, tag, page),
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
  });

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
    setPage(1);
  }, 300);

  const notes: Note[] = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearchChange={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
        <Link href={"/notes/action/create"} className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Something went wrong...</p>}

      {!isLoading && notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}

export default NotesPage;
