import { createContext, useContext, type ReactNode } from "react"

type TParentDragDropContextValue = {
    isDragging: boolean
    isDropping: boolean
}

const ParentDragDropContext = createContext<TParentDragDropContextValue>({
    isDragging: false,
    isDropping: false,
})

type TParentDragDropProviderProps = TParentDragDropContextValue & {
    children: ReactNode
}

const ParentDragDropProvider = ({
    children,
    isDragging,
    isDropping,
}: TParentDragDropProviderProps) => {
    return (
        <ParentDragDropContext.Provider value={{ isDragging, isDropping }}>
            {children}
        </ParentDragDropContext.Provider>
    )
}

const useParentDragDrop = () => {
    return useContext(ParentDragDropContext)
}

export { ParentDragDropProvider, useParentDragDrop }
export type { TParentDragDropContextValue }
