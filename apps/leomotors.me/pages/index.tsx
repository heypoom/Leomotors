import type { GetStaticProps, NextPage } from "next";
import Link from "components/Link";

import {
  Award,
  Briefcase,
  JournalRichtext,
  CodeSquare,
  Github,
  Twitter,
  Linkedin,
} from "react-bootstrap-icons";

import type { Endpoints } from "@octokit/types";

import styles from "styles/Home.module.scss";
import CgWebring from "components/CgWebring";

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const res = (await fetch("https://api.github.com/users/Leomotors").then((r) =>
    r.json()
  )) as Endpoints["GET /user"]["response"]["data"];

  return {
    props: { bio: res.bio },
    revalidate: 600,
  };
};

interface HomeProps {
  bio: string | null;
}

const Home: NextPage<HomeProps> = ({ bio }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-900 py-6 px-1 text-center text-white">
      <h1 className="text-4xl font-bold">Hello! I'm Leo ✨</h1>
      <h2 className="text-3xl font-bold">Nutthapat Pongtanyavichai</h2>

      <p className="mx-auto w-full p-2 text-xl font-semibold md:w-2/3">
        {bio ?? "(Error fetching from GitHub API)"}
      </p>

      <section className={styles.section}>
        <Link name="Portfolio" to="https://portfolio.leomotors.me">
          <Award width="32" height="32" />
        </Link>

        <Link name="Resume" to="https://resume.leomotors.me">
          <Briefcase width="32" height="32" />
        </Link>

        <Link name="Blog" to="https://blog.leomotors.me">
          <JournalRichtext width="32" height="32" />
        </Link>

        <Link name="Repo List" to="https://repos.leomotors.me">
          <CodeSquare width="32" height="32" />
        </Link>
      </section>

      <section className={styles.section}>
        <Link name="GitHub" to="https://github.com/Leomotors">
          <Github width="32" height="32" />
        </Link>

        <Link name="Twitter" to="https://twitter.com/LeomotorsTH">
          <Twitter width="32" height="32" />
        </Link>

        <Link name="LinkedIn" to="https://www.linkedin.com/in/leo-nutthapat/">
          <Linkedin width="32" height="32" />
        </Link>
      </section>

      <footer className={styles.section}>
        <Link
          name="Creators Garten"
          to="https://creatorsgarten.org/ring"
          size="sm"
        >
          <CgWebring />
        </Link>
      </footer>
    </main>
  );
};

export default Home;