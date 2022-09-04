import { GetStaticProps, NextPage } from 'next';
import {
  Flex,
  Text,
  Heading,
  Tag
} from '@chakra-ui/react'
import Project from '../components/Project'
import Head from 'next/head'

type PinnedRepo = {
  owner: string;
  repo: string;
  description: string;
  language: string;
  languageColor: string;
  stars: string;
  forks: string;
};


const Home: NextPage<{ pinnedRepos: PinnedRepo[] }> = ({ pinnedRepos }) => {
    return (
    <>
      <Head>
        <title>home • ayanprkr</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex direction={'column'} px={[6, 10, 14]} py={2} mt={8} mb={[0, 0, 8]} mx="auto">
 
        {/* HERO SECTION */}
        <Flex direction={'column'} my={[2, 6, 6]}>
          <Text fontSize={['sm', 'lg', 'lg']}>
            hey there!
            <br /><br />
            i&apos;m ayan, a 16 year old programming enthusiast from india currently a student and interested in machine learning.
            <br /><br />
            p.s - the green/red/yellow/gray line above indicates my discord status 😎
          </Text>
        </Flex>
 
        <Flex direction={'column'} my={[2, 6, 6]}>
          <Heading fontSize={['lg', '2xl', '2xl']}>skills</Heading>
          <Text my={[1, 3, 3]} fontSize={['sm', 'lg', 'lg']}>
            languages &amp; technologies i currently know
            </Text>
            <Flex direction={'column'} gap={4}>
              <Flex direction={'row'} gap={[2, 4, 4]} mt={[2, 4, 4]} wrap={'wrap'}>
                <Tag>javascript</Tag>
                <Tag>typescript</Tag>
                <Tag>python</Tag>
                <Tag>html/css</Tag>
                <Tag>c/c++</Tag>
                <Tag>react</Tag>
                <Tag>nextjs</Tag>
                <Tag>vue</Tag>
                <Tag>nuxtjs</Tag>
                <Tag>express</Tag>
                <Tag>mongodb</Tag>
              </Flex>
            </Flex>
        
        </Flex>
 
        <Flex direction={'column'} my={[2, 6, 6]}>
          <Heading fontSize={['lg', '2xl', '2xl']}>projects</Heading>
          <Text my={[1, 3, 3]} fontSize={['sm', 'lg', 'lg']}>
            here are some of the cool stuffs i make when i&apos;m lonely
          </Text>
          <Flex direction={'column'} gap={4}>
              <Flex direction={'row'} alignItems="start" gap={[2, 4, 4]} mt={[2, 4, 4]} wrap={'wrap'}>
                {pinnedRepos.slice(0, 3).map((project) => (
                    <Project 
                      key={project.repo}
                      url={`https://github.com/${project.owner}/${project.repo}`}
                      repo={project.repo}
                      description={project.description}
                      language={project.language}
                      stars={project.stars}
                      forks={project.forks}
                    />
                  ))}
              </Flex>
          </Flex>
        </Flex>
 
        <Flex direction={'column'} my={[2, 6, 6]}>
          <Heading fontSize={['lg', '2xl', '2xl']}>blogs</Heading>
          <Text my={[1, 3, 3]} fontSize={['sm', 'lg', 'lg']}>
            currently cooking some...
          </Text>
          <Flex direction={'column'} gap={4}>
              <Flex direction={'row'} alignItems="start" gap={[2, 4, 4]} mt={[2, 4, 4]} wrap={'wrap'}>
                  
              </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
    const pinnedRepos = await fetch("https://gh-pinned-repos.egoist.sh/?username=metalooze05")
      .then(async (response) => {
        return await response.json();
      })
    
      return {
        props: {
          pinnedRepos
        },
        revalidate: 3600
      }
}

export default Home