"use client";

import { ButtonOutline } from "@/components/ui";
import { useAddPage } from "@/hooks/api";

const BoardDetailPage = () => {
  const createPage = useAddPage();

  return (
    <div className="page">
      <main className="page__main">
        <div className="flex flex-col items-center justify-center gap-5 mb-5 w-full h-full">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            How to start:
          </h3>
          <div className="flex flex-col gap-3">
            <small className="text-sm font-normal leading-none">
              1. Create a page
            </small>
            <small className="text-sm font-normal leading-none">
              2. Add boards to page
            </small>
          </div>
          <ButtonOutline onClick={createPage}>Add New Page</ButtonOutline>
        </div>
      </main>
    </div>
  );
};

export default BoardDetailPage;
