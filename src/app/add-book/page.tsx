import { ProtectedPage } from "@/components/auth/protected-page";

export const metadata = {
  title: "Add a book",
};

export default function AddBookPage() {
  return (
    <ProtectedPage
      title="Add a book"
      description="This route is protected and ready for the future book catalog phase."
    />
  );
}
