interface Title {
  title: string;
}

export default function IndexTitle({ title }: Title) {
  return (
    <div className="mb-4 flex flex-col items-center gap-1">
      <h2 className="bg-gradient-to-r from-sky-950 via-blue-600 to-sky-950 bg-clip-text text-center text-4xl font-bold text-transparent">
        {title}
      </h2>
      <div className="h-1 w-1/3 rounded-full bg-gradient-to-r from-blue-900 to-blue-500"></div>
    </div>
  );
}
