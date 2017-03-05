"use strict";
const initialState = [
    {
        state: 0
    }
];
const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return [
                {
                    state: state + 1
                }
            ];
        case 'DECREMENT':
            return [
                {
                    state: state - 1
                }
            ];
        default:
            return [
                {
                    state: state
                }
            ];
    }
    return [
        {
            state: state
        }
    ];
};

export default homeReducer;
