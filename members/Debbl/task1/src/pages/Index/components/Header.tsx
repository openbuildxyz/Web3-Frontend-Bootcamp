export default function Header({ title }: { title: string }) {
  return (
    <header className="mt-6 text-center">
      <h1 className="text-3xl font-medium">{title}</h1>
    </header>
  );
}
