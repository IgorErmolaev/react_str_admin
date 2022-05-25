import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {baseUrl} from "../lib/config";

export const fetchStrCodes = createAsyncThunk(
    'strCodes/fetchStrCodes',
    async function (_, {rejectWithValue}) {
        try {
            let response = await fetch(baseUrl+'/tools/request.php?act=getRejCodes');
            if (!response.ok) {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
            let data = await response.json();
            for (let i = 0; data.data.length>i; i++) {
                data.data[i].key = data.data[i].product+data.data[i].code;
                data.data[i].priority = parseFloat(data.data[i].priority);
                data.data[i].fl_autodec = parseInt(data.data[i].fl_autodec);
            }
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const addAsyncStrCode = createAsyncThunk(
    'strCodes/addAsyncStrCode',
    async function (data, {rejectWithValue,dispatch}) {
        try {
            let response = await fetch(baseUrl+'/tools/request.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    act: 'addStrCode',
                    data: data
                })
            });
            if (!response.ok) {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
            let resp = await response.json();
            if (resp.result !== 'ok') {
                let error = new Error('Error : ' + resp.error);
                error.response = response;
                throw error;
            }
            data.values.key = data.values.product+data.values.code;
            data.values.priority = parseFloat(data.values.priority);
            data.values.fl_autodec = parseInt(data.values.fl_autodec);
            dispatch(addStrCode(data.values));
            return resp;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const changeAsyncStrCode = createAsyncThunk(
    'strCodes/addAsyncStrCode',
    async function (data, {rejectWithValue,dispatch}) {
        try {
            let response = await fetch(baseUrl+'/tools/request.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    act: 'changeStrCode',
                    data: data
                })
            });
            if (!response.ok) {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
            let resp = await response.json();
            dispatch(changeStrCode(data));
            return resp;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

const strCodesSlice = createSlice({
    name: 'strCodes',
    initialState:{
        strCodes:[],
        status:null,
        error:null,
        statusAdd:null,
        errorAdd:null,
    },
    reducers: {
        addStrCode(state,action) {
            state.strCodes.push(action.payload);
        },
        changeStrCode(state,action) {
            for(let i = 0; state.strCodes.length > i; i++) {
                if (state.strCodes[i].key === action.payload.row.key) {
                    state.strCodes[i] = action.payload.row;
                    break;
                }
            }
        }
    },
    extraReducers: {
        [fetchStrCodes.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchStrCodes.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.strCodes = action.payload.data;
        },
        [fetchStrCodes.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [addAsyncStrCode.pending]: (state) => {
            state.statusAdd = 'loading';
            state.errorAdd = null;
        },
        [addAsyncStrCode.fulfilled]: (state) => {
            state.statusAdd = 'resolved';
        },
        [addAsyncStrCode.rejected]: (state, action) => {
            state.statusAdd = 'rejected';
            state.errorAdd = action.payload;
        },
    }
    }
)

export const {addStrCode,changeStrCode} = strCodesSlice.actions;

export default strCodesSlice.reducer;