import { useReducer } from "react";

const ACTIONS = {
    FETCH_INIT: "FETCH_INIT",
    FETCH_SUCCESS: "FECH_SUCCESS",
    FETCH_FAILURE: "FETCH_FAILURE"
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.FETCH_INIT:
            return {
                isError: false,
                isLoading: true,
            };
        case ACTIONS.FETCH_SUCCESS:
            return {
                data: action.payload,
                isError: false,
                isLoading: false,
            };
        case ACTIONS.FETCH_FAILURE:
            return {
                isError: true,
                isLoading: false,
            };
        default:
            return state;
    }
}

function useFetch(url, options ={}) {
    const [state, dispatch] = useReducer(reducer, {
        isError: false,
        isLoading: true,
    });

    function doFetch(newOpcions){
        dispatch({ type: ACTIONS.FETCH_INIT });

        fetch(url, {...options, ...newOpcions})
            .then((response)=> {
                if(response.ok){
                    return response.json();
                }
                throw Error("Error al realizar la peticion");
            })
            .then((data)=> {
                dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data});
            })
            .catch((e)=> {
                dispatch({ type: ACTIONS.FETCH_FAILURE})
            });
    }

    return [state, doFetch];
}

export default useFetch;