import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { RootStore } from './types'
import { createtestConstructorSlice } from './slices/testConstructor.slice'
import { immer } from "zustand/middleware/immer";

export const useStore = create<RootStore>()(
  devtools(
    immer((...a) => ({
      ...createtestConstructorSlice(...a),
    })),
  )
)