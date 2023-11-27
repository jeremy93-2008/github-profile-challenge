import { useEffect, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import useSWR from 'swr'
import { fetcher } from '../services/fetcher'

import searchIcon from '../assets/icon/Search.svg'

export function Search() {
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 500)

    const { data, error, isLoading } = useSWR(
        debouncedSearch
            ? `https://api.github.com/search/repositories?q=${debouncedSearch}&per_page=5`
            : null,
        fetcher,
        {}
    )

    console.log(data)

    return (
        <div className="github-profile__search relative mt-[2vw]">
            <img
                className="absolute top-[18px] left-[12px] opacity-50"
                src={searchIcon}
            />
            <input
                className="bg-darkGrayGithub text-whiteGithub placeholder-lightGrayGithub 
                                w-[36vw] pl-12 pr-6 py-4 rounded-xl outline-none border-2 border-transparent focus:border-lightBlueGithub"
                type="text"
                placeholder="username"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    )
}
