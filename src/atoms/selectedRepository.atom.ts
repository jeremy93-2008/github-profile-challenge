import { atom } from 'jotai'
import { GithubUserResponse } from '../types/github.type'

export const selectedRepositoryAtom = atom<GithubUserResponse | null>(null)
