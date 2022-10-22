import type { NextPage, GetStaticProps } from "next";
import { age } from "../utils/time";
import { useRouter } from "next/router";
import Head from "next/head";

import { 
  SiJavascript,
  SiTypescript,
  SiPython,
  SiNuxtdotjs,
  SiTailwindcss,
  SiMongodb,
  SiPrisma,
  SiPostgresql
} from "react-icons/si";
import {
  FaGlobe,
  FaDocker,
  FaNodeJs,
  FaYarn,
  FaReact,
  FaVuejs,
  FaGitAlt
} from "react-icons/fa";
import {
  TbBrandNextjs
} from "react-icons/tb";
import {
  BiGitRepoForked,
  BiStar
} from "react-icons/bi";
import {
  BsArrowUpRight
} from "react-icons/bs";

type PinnedRepo = {
  owner: string,
  repo: string,
  description: string,
  language: string,
  languageColor: string
  stars: string,
  forks: string
};

const Home: NextPage<{ pinnedRepos: PinnedRepo[] }> = ({ pinnedRepos }) => {
    const router = useRouter();

    const handleClick = (e: any, path: string) => {
        if (path) {
            router.push(path);
        } else {
            console.log("No path provided!");
        }
    };

    return (
      <>       
            <Head>
                <title>Home - ayanprkr</title>  
            </Head>     
            <div className="py-10 md:py-20 flex flex-col justify-center items-start">
                <div className="flex flex-col gap-5">

                    {/* HERO SECTION */}
                    {/* HEADING */}
                    <div className="space-y-5">
                        <h1 className="text-3xl md:text-5xl font-black">Hey, I&apos;m Ayan :)</h1>
                        <p className="text-md md:text-lg text-neutral-300">I&apos;m a <span className="font-semibold text-transparent bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text">{age.toPrecision(5)}</span> year old programming enthusiast residing in India, currently a student who is interested in Full-Stack Development including large scale frontend application and performant serverside code.</p>
                    </div>

                    <div className="pt-5"></div>

                    {/* PROJECTS */}
                    <div className="space-y-2">
                        <h1 className="text-xl md:text-2xl font-black">Repositories 🔬</h1>
                        {/*<p className="text-md md:text-xl font-semibold text-gray-400">Here are some of the <span className="text-transparent bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text">Cool Stuffs</span> I make when I&apos;m lonely.</p>*/}
                        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                            {pinnedRepos?.slice(0, 5).map((project, index) => (
                                <div onClick={(e) => handleClick(e, `https://github.com/${project.owner}/${project.repo}/`)} key={index} className="cursor-pointer hover:bg-neutral-800 hover:bg-opacity-20 hover:shadow-neutral-500 hover:shadow-md font-bold text-gray-400 rounded-lg border-2 border-neutral-500 hover:border-2 px-6 py-4 transition duration-300 hover:-translate-y-1 flex flex-row justify-between gap-2">
                                    <h1 className="text-md md:text-lg text-gray-300">{project.repo}</h1>
                                    <div className="text-xs md:text-lg flex flex-row gap-2 text-gray-400">
                                        <span className="flex flex-row gap-2 justify-center items-center"><BiStar /> {project.stars}</span>
                                        <span className="flex flex-row gap-2 justify-center items-center"><BiGitRepoForked /> {project.forks}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-5"></div>

                    {/* SKILLS */}
                    <div className="space-y-2">
                        <h1 className="text-xl md:text-2xl font-black">Tech Stack</h1>
                        <p className="text-md md:text-lg text-gray-300">I use a wide range of tools to tackle each hurdle in the most efficient manner possible.</p>
                        <div className="pt-4 text-gray-300 text-xs md:text-lg flex flex-row flex-wrap gap-x-10 gap-y-5">
                            <span className="transition duration-300 flex flex-row items-center gap-2"><SiJavascript />JavaScript</span>
                            <span className="transition duration-300 flex flex-row items-center gap-2"><SiTypescript />TypeScript</span>
                            <span className="transition duration-300 flex flex-row items-center gap-2"><SiPython />Python</span>
                            <span className="transition duration-300 flex flex-row items-center gap-2"><FaGlobe />HTML/CSS</span>
                            <span className="transition duration-300 flex flex-row items-center gap-2"><FaDocker />Docker</span>
                            <span className="transition duration-300 flex flex-row items-center gap-2"><FaNodeJs />Node.js</span>
                            <span className="transition duration-300 flex flex-row items-center gap-2"><FaYarn />Yarn</span>
                            <span className="transition duration-300 flex flex-row items-center gap-2"><FaReact />React.js</span>
                            <span className="transition duration-300 flex flex-row items-center gap-2"><TbBrandNextjs />Next.js</span>
                            <span className="transition duration-300 flex flex-row items-center gap-2"><FaVuejs />Vue</span>
                            <span className="transition duration-300 flex flex-row items-center gap-2"><SiNuxtdotjs />Nuxt.js</span>
                            <span className="transition duration-300 flex flex-row items-center gap-2"><SiTailwindcss />TailwindCSS</span>
                            <span className="transition duration-300 flex flex-row items-center gap-2"><FaGitAlt />Git</span>
                            <span className="transition duration-300 flex flex-row items-center gap-2"><SiMongodb />MongoDB</span>
                            <span className="transition duration-300 flex flex-row items-center gap-2"><SiPostgresql />PostgreSQL</span>
                            <span className="transition duration-300 flex flex-row items-center gap-2"><SiPrisma />Prisma</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
  const pinnedRepos = await fetch("https://gh-pinned-repos.egoist.sh/?username=metalooze05")
    .then(async (res) => {
      return await res.json();
    });

  return {
    props: {
      pinnedRepos
    }, 
    revalidate: 3600
  }
}


export default Home;