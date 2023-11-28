import { atom } from 'jotai'
import { GithubResponse } from '../types/github.type'

export const selectedRepositoryAtom = atom<GithubResponse | null>(null)
