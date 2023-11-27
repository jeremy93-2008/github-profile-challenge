import { Search } from "../components/Search"

export function Header() {
    return (
        <div className="github-profile__header flex justify-center bg-hero bg-darkGrayGithub bg-contain bg-no-repeat h-[19vw]">
            <Search />
        </div>
    )
}