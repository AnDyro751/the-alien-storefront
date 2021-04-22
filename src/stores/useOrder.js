import React from 'react';

export const OrderContext = React.createContext({});
const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_ORDER":
            return {
                order: action.payload || {}
            };
        case "DELETE_ORDER":
            return {
                order: {}
            };
        default:
            throw new Error();
    }
};

export const OrderContextProvider = ({children, data = {}}) => {
    const [state, dispatch] = React.useReducer(reducer, data);
    const value = {state, dispatch};
    // console.log(value, "VALUE")
    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
}