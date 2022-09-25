import type { NextPage, GetStaticProps } from "next";
import { trpc } from "../utils/trpc";
import { age } from "../utils/time";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

import { 
  SiJavascript,
  SiTypescript,
  SiPython,
  SiNuxtdotjs,
  SiTailwindcss,
  SiMongodb
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
  BiGitRepoForked
} from "react-icons/bi";

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
            <div className="py-10 flex flex-col justify-center items-start">
                <div className="flex flex-col gap-5">

                    {/* HERO SECTION */}
                    {/* HEADING */}
                    <div className="space-y-5">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-300">Hey, <span className="text-transparent bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text">I&apos;m Ayan :)</span></h1>
                        <p className="text-md md:text-xl font-semibold text-gray-400">I&apos;m a <span className="font-semibold text-transparent bg-gradient-to-r from-teal-500 to-sky-500 bg-clip-text">{age.toPrecision(5)}</span> year old programming enthusiast residing in India, currently a student who is interested in Full-Stack Development including large scale frontend application and performant serverside code.</p>
                    </div>

                    <div className="pt-5"></div>

                    {/* SKILLS */}
                    <div className="space-y-2">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-300">Technologies I Use</h1>
                        <p className="text-md md:text-xl font-semibold text-gray-400">I use a wide range of tools to tackle each hurdle in the most efficient manner possible. <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">I really love working with containersation</span>, especially Docker; it&apos;s proven to be a reliable bit of kit for both production and development environments.</p>
                        <div className="pt-4 text-gray-300 text-xs md:text-lg font-semibold flex flex-row flex-wrap gap-1 md:gap-5 cursor-default">
                            <span className="hover:bg-neutral-900 rounded-lg transition duration-200 px-3 py-2 flex flex-row items-center gap-2"><SiJavascript />JavaScript</span>
                            <span className="hover:bg-neutral-900 rounded-lg transition duration-200 px-3 py-2 flex flex-row items-center gap-2"><SiTypescript />TypeScript</span>
                            <span className="hover:bg-neutral-900 rounded-lg transition duration-200 px-3 py-2 flex flex-row items-center gap-2"><SiPython />Python</span>
                            <span className="hover:bg-neutral-900 rounded-lg transition duration-200 px-3 py-2 flex flex-row items-center gap-2"><FaGlobe />HTML/CSS</span>
                            <span className="hover:bg-neutral-900 rounded-lg transition duration-200 px-3 py-2 flex flex-row items-center gap-2"><FaDocker />Docker</span>
                            <span className="hover:bg-neutral-900 rounded-lg transition duration-200 px-3 py-2 flex flex-row items-center gap-2"><FaNodeJs />Node.js</span>
                            <span className="hover:bg-neutral-900 rounded-lg transition duration-200 px-3 py-2 flex flex-row items-center gap-2"><FaYarn />Yarn</span>
                            <span className="hover:bg-neutral-900 rounded-lg transition duration-200 px-3 py-2 flex flex-row items-center gap-2"><FaReact />React.js</span>
                            <span className="hover:bg-neutral-900 rounded-lg transition duration-200 px-3 py-2 flex flex-row items-center gap-2"><TbBrandNextjs />Next.js</span>
                            <span className="hover:bg-neutral-900 rounded-lg transition duration-200 px-3 py-2 flex flex-row items-center gap-2"><FaVuejs />Vue</span>
                            <span className="hover:bg-neutral-900 rounded-lg transition duration-200 px-3 py-2 flex flex-row items-center gap-2"><SiNuxtdotjs />Nuxt.js</span>
                            <span className="hover:bg-neutral-900 rounded-lg transition duration-200 px-3 py-2 flex flex-row items-center gap-2"><SiTailwindcss />TailwindCSS</span>
                            <span className="hover:bg-neutral-900 rounded-lg transition duration-200 px-3 py-2 flex flex-row items-center gap-2"><FaGitAlt />Git</span>
                            <span className="hover:bg-neutral-900 rounded-lg transition duration-200 px-3 py-2 flex flex-row items-center gap-2"><SiMongodb />MongoDB</span>
                        </div>
                    </div>

                    <div className="pt-5"></div>

                    {/* PROJECTS */}
                    <div className="space-y-2">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-300">Repositories 🔬</h1>
                        <p className="text-md md:text-xl font-semibold text-gray-400">Here are some of the <span className="text-transparent bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text">Cool Stuffs</span> I make when I&apos;m lonely.</p>
                        <div className="pt-4 flex flex-row flex-wrap gap-5">
                            {pinnedRepos?.slice(0, 5).map((project) => (
                                <div onClick={(e) => handleClick(e, `https://github.com/${project.owner}/${project.repo}/`)} key={project.repo} className="cursor-pointer max-w-lg hover:bg-neutral-900 hover:bg-opacity-50 font-bold text-gray-400 rounded-lg border-2 border-neutral-900 hover:border-2 px-6 py-4 transition duration-300 flex flex-col justify-start h-fit gap-2">
                                    <h1 className="text-md md:text-xl">{project.repo}</h1>
                                    <p className="text-xs md:text-lg text-gray-500 font-normal">{project.description.slice(0, 50)}...</p>
                                    <div className="text-xs md:text-lg flex flex-row gap-5">
                                        <span>⭐ {project.stars}</span>
                                        <span className="flex flex-row gap-2 justify-center items-center"><BiGitRepoForked /> {project.stars}</span>
                                    </div>
                                </div>
                            ))}
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