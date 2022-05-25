import React from "react";
import {Alert, Button} from "react-bootstrap";
import {useSelector} from "react-redux";
import Loading from "./Loading";

function UseAlert(props) {

    const {status, error}  = useSelector(state => {
        if (props.opertype === 'ADD')
        return {
            status:state.strCodesState.statusAdd,
            error:state.strCodesState.errorAdd,
        }
        else if (props.opertype === 'CHANGE')
            return {
                status:state.strCodesState.statusCh,
                error:state.strCodesState.errorCh,
            }
        else return {
                status:null,
                error:null,
            }
    });


    if (status === 'loading')
        return (
            <Loading/>
        );
    else if (status === 'rejected')
        return (
        <>
            <Alert show={props.show} variant="danger">
                <Alert.Heading>Помилка! Щось пішло не так!</Alert.Heading>
                <p>{error}</p>
                <hr/>
                <div className="d-flex justify-content-end">
                    <Button onClick={props.toggleButton} variant="outline-danger">ОК</Button>
                </div>
            </Alert>
        </>
    );
    else return (
            <>
                <Alert show={props.show} variant="light">
                    <Alert.Heading>{props.header}</Alert.Heading>
                    <p>{props.mainText}</p>
                    <hr/>
                    <div className="d-flex justify-content-end">
                        <Button onClick={props.toggleButton} variant="outline-success">ОК</Button>
                    </div>
                </Alert>
            </>
        );
}

export default UseAlert;