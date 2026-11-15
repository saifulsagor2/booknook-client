import { ProtectedPage } from "@/components/auth/protected-page";

export const metadata = {
  title: "My borrows",
};

export default function MyBorrowsPage() {
  return (
    <ProtectedPage
      title="My borrows"
      description="Borrowing history will appear here in a later phase."
    />
  );
}
