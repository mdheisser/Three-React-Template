import create from "zustand";
import { stateContext } from "react-three-fiber";

const [useSampleStates] = create(set => ({
    sample: {
        name: "",
        type: "",
        id: ""
    },
    time: {
        custom: new Date()
    },
    transfCtrl: {
    },
    setSample: (sample: any) => set(state => ({ ...state, sample: sample })),
    setTime: (customTime: any) => { set(state => ({ ...state, time: { custom: customTime } })) },
    setTransfCtrl: (ctrl: any) => set(state => ({ ...state, transfCtrl: ctrl }))
}))

export { useSampleStates };