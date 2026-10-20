import { NoteFormValues } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialDraft: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo" as string,
};

interface NoteDraftStore {
  draft: NoteFormValues;
  setDraft: (noteDraftData: Partial<NoteFormValues>) => void;
  clearDraft: () => void;
}

export const useNoteDraft = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (noteDraftData) => {
        return set((prevState) => ({
          draft: { ...prevState.draft, ...noteDraftData },
        }));
      },
      clearDraft: () => {
        return set({ draft: initialDraft });
      },
    }),
    {
      name: "note-draft-storage",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);