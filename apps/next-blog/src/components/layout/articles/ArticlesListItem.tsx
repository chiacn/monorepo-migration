import Link from "next/link";

interface ArticleListItemProps {
  urlPath: string;
  title: string;
}

export default function ArticlesListItem({
  urlPath,
  title,
}: ArticleListItemProps) {
  return (
    <li key={urlPath + title} className="mb-2">
      <Link href={urlPath}>
        <div className="text-blue-500 hover:underline">{title}</div>
      </Link>
    </li>
  );
}
