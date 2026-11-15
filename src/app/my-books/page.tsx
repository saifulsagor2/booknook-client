import { ProtectedPage } from "@/components/auth/protected-page";

export const metadata = {
  title: "My books",
};

export default function MyBooksPage() {
  return (
    <ProtectedPage
      title="My books"
      description="Your personal bookshelf will appear here in a later phase."
    />
  );
}
