import create from "zustand";
// import { stateContext } from "react-three-fiber";

const [useSampleStates] = create((set, get) => ({
    time: {
        custom: new Date()
    },
    controls: {
    },
    setTime: (customTime: any) => { set({ ...get(), time: { custom: customTime } }) },
    setControls: (ctrl: any) => set({ ...get(), controls: ctrl })
}))

export { useSampleStates };