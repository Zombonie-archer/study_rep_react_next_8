"use client";
import css from "./NoteDetails.module.css";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { useRouter } from 'next/navigation';

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
  });

  return (
    <Modal onClose={router.back}>
      <main className={css.main}>
        {isLoading && <p>Loading, please wait...</p>}
        {isError && <p>Something went wrong.</p>}
        {data && (
          <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{data.title}</h2>
              </div>
              <p className={css.tag}>{data.tag}</p>
              <p className={css.content}>{data.content}</p>
              <p className={css.date}>
                {new Date(data.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}
        <button className={css.backBtn} onClick={router.back}>
          Close
        </button>
      </main>
    </Modal>
  );
}
