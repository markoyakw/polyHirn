import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { RootStore } from './types'
import { createTestBuilderSlice } from './slices/testBuilderSlice'
import { immer } from "zustand/middleware/immer";

export const useStore = create<RootStore>()(
  devtools(
    immer((...a) => ({
      ...createTestBuilderSlice(...a),
    })),
  )
)