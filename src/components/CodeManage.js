import {Container, Button, Alert, Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchStrCodes} from "../redux/strCodesSlice";
import BtsTable from "./BtsTable";
import Loading from "./Loading";
import ModalAddCode from "./ModalAddCode";
import NotAllow from "./NotAllow";
import {
    allowRolesHome, baseUrl,
    CONV_ID_REJCODES,
    CONV_KEY_REJCODES,
    CONV_LOGIN_REJCODES,
    CONV_REF_REJCODES,
    CONV_URL_API2
} from "../lib/config";
import {alert} from 'react-bootstrap-confirmation';

function CodeManage() {
    const {status} = useSelector(state => state.strCodesState);
    const {auth} = useSelector(state => state.authState);
    const dispatch = useDispatch();

    const [checkRole, setCheckRole] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const display = async (text, btnStyle) => {
        await alert(text,{okButtonStyle:btnStyle});
    };

    const sendConv = async () => {
        let dat = Math.floor(Date.now() / 1000);
        let bodyReq = {
            "modify":"Y",
            "modifyTime": dat
        };
        let response = await fetch(baseUrl+'/tools/request.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: JSON.stringify({
                act: 'sendModifyConv',
                data: {
                    CONV_URL_API2,
                    taskRef:CONV_REF_REJCODES,
                    convId:CONV_ID_REJCODES,
                    secret:CONV_KEY_REJCODES,
                    login:CONV_LOGIN_REJCODES,
                    body:bodyReq
                }
            })
        });
        if (!response.ok) {
            display('Error ' + response.status + ': ' + response.statusText,"danger");
        }
        let resp = await response.json();
        if (resp.request_proc !== 'ok') {
            display(resp.request_proc,"danger");
        } else if (resp.ops[0].proc !== 'ok') {
            let er = JSON.parse(resp.ops[0].description);
            display(er.description,"danger");
        } else display('Оновлено!', 'success');
    }



    useEffect(() => {
        let arr = Object.keys(auth.userData.userRoles);
        for (let i = 0; arr.length>i; i++) {
            if (allowRolesHome.indexOf(arr[i]) !== -1) {
                setCheckRole(true);
                dispatch(fetchStrCodes());
                console.log('init');
                break;
            }
        }
    },[]);

    return (
        checkRole?
            <Container fluid>
                <h3 className="pageHeaadText">Управління кодами</h3>
                <hr/>
                <Col md={4}>
                    <Alert variant="info">Для редагування таблиці - подвійний клік.<br/>
                    Сортування - клік по назві колонки.</Alert>
                </Col>
                <hr/>
                <Row>
                    <Col>
                        <Button variant="success" onClick={handleShow}>
                            Додати код
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="outline-success" onClick={sendConv}>
                            Оновити коди на стратегіях
                        </Button>
                    </Col>
                </Row>

                <hr/>
                {show && <ModalAddCode show={show} handleClose={handleClose}/>}
                    {status === 'resolved' && <BtsTable/>}
                    {status === 'loading' && <Loading/>}
                </Container>
        :
            <NotAllow/>
    );
}

export default CodeManage;
