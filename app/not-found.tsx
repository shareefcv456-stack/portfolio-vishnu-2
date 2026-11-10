import Link from "next/link";

export default function NotFound() {
  return (
    <section className="tone-espresso grain relative grid min-h-[80svh] place-items-center pt-24 text-center">
      <div className="wrap">
        <p className="eyebrow justify-center">404</p>
        <h1 className="display h-xl mt-6">
          This page has <em>moved on.</em>
        </h1>
        <Link href="/" className="btn mt-12">
          Return home
        </Link>
      </div>
    </section>
  );
}
