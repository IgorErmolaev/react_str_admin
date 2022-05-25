import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {baseUrl} from "../lib/config";

//const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));

export const fetchAuthCheck = createAsyncThunk(
    'auth/fetchAuthCheck',
    // async () =>{
    //     await delay(1000);
    //     return {
    //         "isAuth": "Y",
    //         "userData": {
    //             "ldap": "HZ210492EIA",
    //             "userPhoto": "https://staff.a-bank.com.ua/photo/HZ210492EIA",
    //             "userName": "Ермолаев Игорь Анатольевич",
    //             "posCode": "00033463",
    //             "userRoles": {
    //                 "Kk": "Кред. карта перегляд журналу",
    //                 "qq": "Супер-администратор поддержки направления Риск-менеджме",
    //                 "Rr": "Розстрочка перегляд журналу",
    //                 "tu": "Пользователь сервиса триггеров повышения лимитов",
    //                 "ad": "Администратор Web-комплекса",
    //                 "qt": "Изменение лимитов корпоративным клиентам",
    //                 "ru": "Рест пользователь",
    //                 "Fk": "Адміністратор \"ПК Фінансовий стан\"",
    //                 "lu": "Пользователь системы Лимиты Расходных Операций",
    //                 "Bn": "ШГ перегляд журналу",
    //                 "ua": "Администрация Андеррайтинга",
    //                 "ft": "Администрация Soft Collection",
    //                 "dw": "Просмотр дашбордов",
    //                 "ex": "Андеррайтер",
    //                 "ul": "Пользователь сервиса предрассчитанных лимитов",
    //                 "qm": "Изменение лимитов корпоративным клиентам (MAIN)"
    //             }
    //         }
    //     }
    // }
    async function (_, {rejectWithValue}) {
        try {
            let response = await fetch(baseUrl+'/tools/request.php?act=authCheck');
            if (!response.ok) {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
            let data = await response.json();
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

const authSlice = createSlice({
        name: 'auth',
        initialState:{
            auth:[],
            status:null,
            error:null
        },
        reducers: {
        },
        extraReducers: {
            [fetchAuthCheck.pending]: (state, action) => {
                state.status = 'loading';
                state.error = null;
            },
            [fetchAuthCheck.fulfilled]: (state, action) => {
                console.log(action);
                state.status = 'resolved';
                state.auth = action.payload;
            },
            [fetchAuthCheck.rejected]: (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            },
        }
    }
)


export default authSlice.reducer;