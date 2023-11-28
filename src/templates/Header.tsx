import { Search } from '../components/Search'

export function Header() {
    return (
        <section className="github-profile__header flex justify-center bg-hero bg-darkGrayGithub bg-[length:150%_100%] bg-[position:50%] lg:bg-[length:100%] lg:bg-[position:0] bg-no-repeat h-[36vh] lg:h-[19vw]">
            <Search />
        </section>
    )
}
