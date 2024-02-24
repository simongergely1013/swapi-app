import Link from "next/link";

const styles = {
  main:"flex min-h-screen flex-col items-center p-24 border-l border-r border-slate-950 text-2xl",
  link: "hover:text-blue-700"
}

export default function Home() {
  return (
    <main className={styles.main}>
        <Link href={"/characters"} className={styles.link}>Click here to see all the characters</Link>
    </main>
  );
}
