import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { RootStore } from './types'
import { createTestBuilderSlice } from './slices/testBuilderSlice'

export const useStore = create<RootStore>()(
  devtools(
    (...a) => ({
      ...createTestBuilderSlice(...a),
    }),
    { name: 'AppStore' }
  )
)