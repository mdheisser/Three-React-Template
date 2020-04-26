import create from "zustand";
// import { stateContext } from "react-three-fiber";

const [useSampleStates] = create((set, get) => ({
    sample: {
        name: "",
        case: "",
        arg: ""
    },
    time: {
        custom: new Date()
    },
    controls: {
    },
    setSample: (props: any) => set({ ...get(), sample: {...(get().sample), ...props} }),
    setTime: (customTime: any) => { set({ ...get(), time: { custom: customTime } }) },
    setControls: (ctrl: any) => set({ ...get(), controls: ctrl })
}))

export { useSampleStates };