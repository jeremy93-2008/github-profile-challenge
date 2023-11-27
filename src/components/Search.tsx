import searchIcon from '../assets/icon/Search.svg'

export function Search() {
    return (
        <div className="github-profile__search relative mt-[2vw]">
            <img
                className="absolute top-[18px] left-[12px] opacity-50"
                src={searchIcon}
            />
            <input
                className="bg-darkGrayGithub text-whiteGithub placeholder-lightGrayGithub 
                                w-[36vw] pl-12 pr-6 py-4 rounded-md outline-none border-2 border-transparent focus:border-lightBlueGithub"
                type="text"
                placeholder="username"
            />
        </div>
    )
}
