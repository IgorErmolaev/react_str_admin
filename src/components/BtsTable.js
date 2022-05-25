import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import {useSelector, useDispatch} from "react-redux";
import Loading from "./Loading";
import {getName} from "../lib/functions";
//import {confirm} from 'react-bootstrap-confirmation';
import {changeAsyncStrCode} from "../redux/strCodesSlice";

function BtsTable() {
    const dispatch = useDispatch();
    const {status,error, strCodes} = useSelector(state => state.strCodesState);
    const {auth} = useSelector(state => state.authState);

    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total"> { from } - { to } з { size }</span>
    );

    const options = {
        paginationSize: 4,
        pageStartIndex: 1,
        firstPageText: 'Початок',
        prePageText: 'Назад',
        nextPageText: 'Наступна',
        lastPageText: 'Кінець',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        sizePerPageList: [{
            text: '10', value: 10
        }, {
            text: '20', value: 20
        },  {
            text: '50', value: 50
        }, {
            text: 'All', value: strCodes !== undefined ?strCodes.length:0
        }]
    };

    const defaultSorted = [{
        dataField: 'product',
        order: 'desc'
    }];

    let columns = [];
    if (strCodes.length > 0) {
        let keys = Object.keys(strCodes[0]);
        let arr = [];
        for (let i =0; keys.length>i; i++) {
            if (keys[i] !== "key") {
                let obj = {};
                obj.dataField = keys[i];
                obj.text = getName(keys[i]);
                obj.sort = true;
                obj.filter = textFilter({
                    placeholder: 'Фільтр по '+obj.text,
                });
                if (['product','code'].indexOf(keys[i]) !== -1) {
                    obj.editable = false;
                }
                arr.push(obj);
            }
        }
        columns = arr;
    }

    function beforeSaveCell(oldValue, newValue, row, column, done) {
        // setTimeout(async () => {
        //         const result = await confirm('Бажаєте зберегти зміни?',{okButtonStyle:'success',okText:'Так', cancelText:'Ні', cancelButtonStyle:'danger'});
        //         console.log('True if confirmed, false otherwise:', result);
        //         if (result) {
        //             done(true);
        //             dispatch(changeStrCode(row));
        //         } else {
        //             done(false);
        //         }
        //     }, 0);
        setTimeout(() => {
            if (window.confirm('Бажаєте зберегти зміни?')) {
                done(true);
                dispatch(changeAsyncStrCode({oldValue, newValue, row, column, ldap:auth.userData.ldap}));
            } else {
                done(false);
            }
        }, 0);
        return { async: true };
    }

    if (status === 'loading') return (
        <Loading/>
    ); else if (status === 'rejected') return (
        <h1>{error}</h1>
    );
    return (
        <BootstrapTable
            keyField='key'
            data={  JSON.parse(JSON.stringify(strCodes)) }
            columns={ columns }
            defaultSorted={ defaultSorted }
            pagination={ paginationFactory(options) }
            filter={ filterFactory() }
            striped
            hover
            filterPosition="top"
            cellEdit={ cellEditFactory({
                mode: 'dbclick',
                beforeSaveCell,
            })}
        />
    );
}

export default BtsTable;