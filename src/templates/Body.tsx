import useSWR from 'swr'
import { useAtomValue } from 'jotai'
import { formatDistance } from 'date-fns'
import { fetcher } from '../services/fetcher'
import { selectedRepositoryAtom } from '../atoms/selectedRepository.atom'

import Chield_alt from '../assets/icon/Chield_alt.svg'
import Nesting from '../assets/icon/Nesting.svg'
import Star from '../assets/icon/Star.svg'

import { GithubRepositoryResponse } from '../types/github.type'

export function Body() {
    const selectedRepository = useAtomValue(selectedRepositoryAtom)

    const { data } = useSWR<GithubRepositoryResponse[]>(
        selectedRepository
            ? `https://api.github.com/users/${selectedRepository.login}/repos?per_page=4`
            : null,
        fetcher,
        {}
    )

    return (
        <section
            className={`github-profile__body flex flex-col flex-1 ${selectedRepository ? 'visible' : 'invisible'
                }`}
        >
            <section className="github-profile__body--header flex justify-center">
                <article className="bg-darkGrayGithub -mt-8 p-2 mr-8 rounded-lg">
                    <img
                        className="rounded-lg"
                        width={96}
                        src={selectedRepository?.avatar_url}
                    />
                </article>
                <section className='flex flex-col gap-1 lg:flex-row lg:gap-4'>
                    <article className="github-profile__body--header--info flex items-center bg-darkBlueGithub text-whiteGithub mt-2 h-12 py-2 px-5 w-fit rounded-lg">
                        <span className="text-sm text-lightGrayGithub mr-3">
                            Followers
                        </span>
                        <span className="border-l-[1px] border-lightGrayGithub pl-3">
                            {selectedRepository?.followers}
                        </span>
                    </article>
                    <article className="github-profile__body--header--info flex items-center bg-darkBlueGithub text-whiteGithub mt-2 h-12 py-2 px-5 w-fit rounded-lg">
                        <span className="text-sm text-lightGrayGithub mr-3">
                            Following
                        </span>
                        <span className="border-l-[1px] border-lightGrayGithub pl-3">
                            {selectedRepository?.following}
                        </span>
                    </article>
                    <article className="github-profile__body--header--info flex items-center bg-darkBlueGithub text-whiteGithub mt-2 h-12 py-2 px-5 w-fit rounded-lg">
                        <span className="text-sm text-lightGrayGithub mr-3">
                            Location
                        </span>
                        <span className="border-l-[1px] border-lightGrayGithub pl-3">
                            {selectedRepository?.location}
                        </span>
                    </article>
                </section>

            </section>
            <section className="github-profile__body--title mt-4 flex mx-auto lg:mx-0 justify-center">
                <section className="w-[60vw] lg:w-[795px]">
                    <h1 className="text-xl text-whiteGithub font-medium">
                        {selectedRepository?.name}
                    </h1>
                    <p className="text-md text-lightGrayGithub">
                        {selectedRepository?.bio}
                    </p>
                </section>
            </section>
            <section className="github-profile__body--content mt-8 lg:ml-12 flex flex-col items-center">
                <section className="grid grid-cols-1 lg:grid-cols-2 grid-rows-[auto-fit_minmax(900px,_1fr)_100px] gap-10 lg:gap-4 lg:w-[855px]">
                    {data &&
                        data.length > 0 &&
                        data.map((repo) => (
                            <a href={`https://github.com/${selectedRepository?.login}/${repo.name}`} target='_blank'>
                                <section className="github-profile__body--content--repository flex flex-col bg-gradient-to-r from-darkBlueGithub to-blueGithub text-whiteGithub rounded-lg pt-4 px-4">
                                    <h1>{repo.name}</h1>
                                    <p className="flex-1 mt-2 text-sm text-whiteGithub">
                                        {repo.description}
                                    </p>
                                    <div className="flex mt-7 mb-3">
                                        {repo.license && (
                                            <div className="flex text-sm items-center rounded-md mr-2">
                                                <img src={Chield_alt} />
                                                <span className="ml-2">
                                                    {repo.license?.spdx_id}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex text-sm items-center rounded-md mr-2">
                                            <img src={Nesting} />
                                            <span className="ml-2">
                                                {repo.forks_count}
                                            </span>
                                        </div>
                                        <div className="flex text-sm items-center rounded-md mr-2">
                                            <img src={Star} />
                                            <span className="ml-2">
                                                {repo.stargazers_count}
                                            </span>
                                        </div>
                                        <div className="flex text-xs items-center rounded-md">
                                            <span className="ml-2">
                                                updated{' '}
                                                {formatDistance(
                                                    new Date(repo.updated_at),
                                                    new Date(),
                                                    { addSuffix: true }
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </section>
                            </a>
                        ))}
                </section>
                <section className="flex justify-center mt-8 mb-14">
                    <a target='_blank' href={`https://github.com/orgs/${selectedRepository?.name}/repositories`}>
                        <button className="text-whiteGithub py-2 px-4 rounded-lg">
                            View all repositories
                        </button>
                    </a>
                </section>
            </section>
        </section>
    )
}
