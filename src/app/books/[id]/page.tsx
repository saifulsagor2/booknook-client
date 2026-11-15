import { BookDetails } from "@/components/books/book-details";

type BookDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookDetailsPage({ params }: BookDetailsPageProps) {
  const { id } = await params;
  return <BookDetails bookId={id} />;
}
