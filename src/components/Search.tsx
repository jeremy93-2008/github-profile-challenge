import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { useAtom } from 'jotai'
import { useDebounce } from '@uidotdev/usehooks'

import { selectedRepositoryAtom } from '../atoms/selectedRepository.atom'
import { fetcher } from '../services/fetcher'
import searchIcon from '../assets/icon/Search.svg'
import { GithubUserResponse } from '../types/github.type'

export function Search() {
    const [_selectedRepository, setSelectedRepository] = useAtom(
        selectedRepositoryAtom
    )
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 500)

    const { data } = useSWR<GithubUserResponse>(
        debouncedSearch
            ? `https://api.github.com/users/${debouncedSearch}`
            : null,
        fetcher,
        {}
    )

    const [isInputFocused, setIsInputFocused] = useState(false)
    const refSection = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!data) return
        if (!refSection.current) return
        refSection.current.animate(
            [
                { transform: 'translateY(-10px)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 },
            ],
            {
                duration: 300,
                fill: 'forwards',
                easing: 'ease',
            }
        )
    }, [data])

    const refSearchContainer = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (!refSearchContainer.current) return
            if (refSearchContainer.current.contains(e.target as Node)) return
            setIsInputFocused(false)
        }
        document.addEventListener('click', onClickOutside)
        return () => document.removeEventListener('click', onClickOutside)
    }, [])

    const onFocus = () => {
        setIsInputFocused(true)
    }

    const onItemClicked = () => {
        setIsInputFocused(false)
        setSearch('')
        if (!data) return
        setSelectedRepository(data)
    }

    return (
        <section
            ref={refSearchContainer}
            className="github-profile__search relative mt-[2vw]"
        >
            <img
                className="absolute top-[18px] left-[12px] opacity-50"
                src={searchIcon}
            />
            <input
                className="bg-darkGrayGithub text-whiteGithub placeholder-lightGrayGithub 
                                w-[80vw] lg:w-[36vw] pl-12 pr-6 py-4 rounded-xl outline-none border-2 border-transparent focus:border-lightBlueGithub"
                type="text"
                placeholder="username"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={onFocus}
            />
            <section
                ref={refSection}
                className={`bg-darkBlueGithub text-whiteGithub mt-2 p-2 rounded-lg ${isInputFocused && data ? 'visible' : 'hidden'
                    }`}
            >
                <ul className="flex flex-col gap-2">
                    {isInputFocused && data && (
                        <li
                            onClick={onItemClicked}
                            className="flex items-center gap-3 cursor-pointer"
                            key={data.id}
                        >
                            <img
                                className="rounded-lg"
                                width={64}
                                src={data.avatar_url}
                            />
                            <p className="flex flex-col text">
                                <span>{data.name}</span>
                                <span className="text-xs text-gray-500">
                                    {data.bio}
                                </span>
                            </p>
                        </li>
                    )}
                </ul>
            </section>
        </section>
    )
}
