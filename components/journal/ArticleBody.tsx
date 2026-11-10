import { Fragment, type ReactNode } from "react";

/** Renders inline **bold** spans. */
const inline = (text: string): ReactNode[] =>
  text.split(/(\*\*.+?\*\*)/g).map((part, i) =>
    part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>
  );

/** Minimal renderer for article copy: "## " headings, "- " list items, paragraphs. */
export function ArticleBody({ body }: { body: string }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) blocks.push(<ul key={`ul-${blocks.length}`}>{list.map((li, i) => <li key={i}>{inline(li)}</li>)}</ul>);
    list = [];
  };
  for (const raw of body.trim().split("\n")) {
    const line = raw.trim();
    if (line.startsWith("- ")) {
      list.push(line.slice(2));
      continue;
    }
    flush();
    blocks.push(line.startsWith("## ") ? <h2 key={blocks.length}>{line.slice(3)}</h2> : <p key={blocks.length}>{inline(line)}</p>);
  }
  flush();
  return <div className="article-body">{blocks}</div>;
}
