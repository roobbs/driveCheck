interface Title {
  title: string;
}

export default function IndexTitle({ title }: Title) {
  return (
    <h2 className="via--900 relative mb-6 bg-gradient-to-r from-sky-950 via-blue-600 to-sky-950 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent">
      {title}
      <span className="absolute bottom-[-10px] left-1/2 h-1 w-1/3 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-900 to-blue-500"></span>
    </h2>
  );
}
