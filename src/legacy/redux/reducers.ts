import { combineReducers } from 'redux'
import { createReducer } from '@reduxjs/toolkit'
import { CONTROL_TYPE } from '../constants';

const UiSettings = createReducer({
    showDbgCanvas: false,
    showTimeline: false,
    showGraph: false
}, {
    UI_SETUP: (state, action) => {
        state = action.payload;
    }
});

/*
updateValue(state, action) {
    const {someId, someValue} = action.payload;
    state.first.second[someId].fourth = someValue;
}
*/

/**
 * State common to all demos samples
 */
const DemoSamples = createReducer({
    sampleType: "",
    sampleName: "",
    sampleId: "",
    time: {
        current: 0,
        custom: {
            hour: 12,
            min: 0
        }
    },
    commands: {
        lock: false,
        trigger: false,
        toggle: false,
        switch: false,
        next: false,
        prev: false,
        left: 0,
        right: 0,
        up: false,
        down: false,
        movex: 0,
        movey: 0
    },
    control: CONTROL_TYPE.ORBIT,
    debug: {
    },
    backup: {
        time: 0
    }
}, {
    GLOBAL: (state, action) => {
        state.sampleType = action.payload.sampleType;
        state.sampleName = action.payload.sampleName;
        state.sampleId = action.payload.sampleId;
    },
    CHANGE_CTRL:(state, action) => {
        state.control = action.payload;
    }, 
    COMMAND: (state, action) => {
        state.commands.lock = action.payload.btn === 1 && action.payload.isDown;
        state.commands.next = action.payload.btn === 4 && action.payload.isDown;
        state.commands.prev = action.payload.btn === 3 && action.payload.isDown;
        state.commands.trigger = action.payload.btn === 1 && action.payload.isDown;
        state.commands.toggle = action.payload.key === 32 && action.payload.isDown ? !state.commands.toggle : state.commands.toggle;
        state.commands.switch = action.payload.key === 9 && action.payload.isDown;
        state.commands.movex = action.payload.moveX ? action.payload.moveX : 0;
        state.commands.movey = action.payload.moveY ? action.payload.moveY : 0;
        state.commands.left = action.payload.key === 37 && action.payload.isDown ? state.commands.left + 1 : 0;
        state.commands.right = action.payload.key === 39 && action.payload.isDown ? state.commands.right + 1 : 0;
        state.commands.up = action.payload.key === 38 && action.payload.isDown;
        state.commands.down = action.payload.key === 40 && action.payload.isDown;
    },
    TIMING: (state, action) => {
        state.time.current = action.payload.current ? action.payload.current : state.time.current; //"SET_CURRENT"
        state.time.custom = action.payload.custom ? action.payload.custom : state.time.custom; //"SET_CUSTOM"
        // state.time.backup = action.payload.backup ? action.payload.backup : state.time.backup; //"BACKUP"
    },
    BACKUP: (state, action) => {
        var backup = onTheFly(action, state.backup);
        var newState = { backup };
        return Object.assign({}, state, newState)
    },
    DEBUG: (state, action) => {
        var debug = onTheFly(action, state.debug);
        var newState = { debug };
        return Object.assign({}, state, newState)
    },
    MANUAL_TRIGGER: (state, action) => {
        console.log("trigger? " + action.payload.enabled);
        state.commands.trigger = action.payload.enabled
    }
})

function onTheFly(action: any, current: any) {
    var next = Object.assign({}, current);
    var prevVal;
    switch (action.subtype) {
        case "STORE_VAL":
            next[action.key] = action.val
            // console.log(current.debug);
            break;
        case "ACC_VAL":
            prevVal = next[action.key] ? next[action.key] : 0;
            next[action.key] = prevVal + action.val;
            // console.log(current.debug);
            break;
        case "ACC_ARR":
            prevVal = next[action.key] ? next[action.key] : [];
            next[action.key] = [...prevVal, action.val];
            // console.log(current.debug);
            break;
        case "INC_VAL":
            next[action.key] = next[action.key] + 1;
            break;
    }
    return next
}

const rootReducer = combineReducers({
    DemoSamples, UiSettings
})

export default rootReducer