import create from "zustand";
// import { stateContext } from "react-three-fiber";

const [useSampleStates] = create((set, get) => ({
    sample: {
        name: "",
        caseNb: ""
    },
    time: {
        custom: new Date()
    },
    transfCtrl: {
    },
    setSample: (props: any) => set({ ...get(), sample: {...(get().sample), ...props} }),
    setTime: (customTime: any) => { set({ ...get(), time: { custom: customTime } }) },
    setTransfCtrl: (ctrl: any) => set({ ...get(), transfCtrl: ctrl })
}))

export { useSampleStates };