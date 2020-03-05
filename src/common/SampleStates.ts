import create from "zustand";

const [useSampleStates] = create(set => ({
    transfCtrl: {
    },
    setTransfCtrl: 
    // (rowKey: any, rowVal: any) => set(state => {
        (ctrl: any)=> set(state=>{
        return { ...state, transfCtrl: ctrl}
    })
}))
// export default useVoxelStates
// increase: () => set(state => ({ count: state.count + 1 })),

export { useSampleStates };