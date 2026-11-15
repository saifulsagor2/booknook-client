import { BookCard } from "@/components/books/book-card";

const featuredBooks = [
  {
    title: "The Quiet Between Tides",
    author: "Mira Ellery",
    category: "Fiction",
    theme: "forest" as const,
    coverLine: "where the shore remembers",
  },
  {
    title: "A Map of Small Things",
    author: "Jonah Wren",
    category: "Reflection",
    theme: "clay" as const,
    coverLine: "notes for the curious",
  },
  {
    title: "The Long Way Home",
    author: "Elia Rowan",
    category: "Adventure",
    theme: "gold" as const,
    coverLine: "a story of finding your way",
  },
];

export function FeaturedBooks() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
      {featuredBooks.map((book) => (
        <BookCard key={book.title} {...book} />
      ))}
    </div>
  );
}
