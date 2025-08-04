import { createContext, useContext, useState } from 'react'

export const GroupContext = createContext({
  currGroup: '',
  setCurrGroup: () => {},
  groups: [],
  setGroups: () => {},
})

export const GroupProvider = GroupContext.Provider

export default function useGroup() {
  return useContext(GroupContext)
}
