import { useAtomValue } from 'jotai'
import { selectedRepositoryAtom } from "../atoms/selectedRepository.atom";

export function Body() {
    const selectedRepository = useAtomValue(selectedRepositoryAtom)

    return selectedRepository && selectedRepository?.name

}