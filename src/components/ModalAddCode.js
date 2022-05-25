import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Modal, Button,Form, Col, Row} from "react-bootstrap";
import { Formik } from "formik";
import {addAsyncStrCode} from "../redux/strCodesSlice";
import UseAlert from "./Alert";
import {allProducts} from "../lib/config";

function ModalAddCode(props) {
    const {auth} = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const [alertShow,setAlertShow]=useState(false);
    const [formValues,setFormValues]=useState({});


    return (
        <Modal {...props} size='lg'>

                {!alertShow ?
                    <>
                        <Modal.Header closeButton onClick={props.handleClose}>
                            <Modal.Title>Додати код</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Formik
                                initialValues={{
                                    "product": allProducts[0],
                                    "code": '',
                                    "comment": '',
                                    "comment_ru": '',
                                    "comment_no_front": '',
                                    "priority": '',
                                    "fl_autodec": false
                                }}
                                onSubmit={(values) => {
                                    if (values.fl_autodec) values.fl_autodec = '1';
                                    else values.fl_autodec = '0';
                                    setFormValues(values);
                                    dispatch(addAsyncStrCode({values:values,ldap:auth.userData.ldap}));
                                    setAlertShow(true);
                                }}
                            >
                                {({
                                      values,
                                      errors,
                                      touched,
                                      handleChange,
                                      handleBlur,
                                      handleSubmit,
                                      isSubmitting
                                  }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group as={Row} className="mb-3" controlId="formProduct">
                                            <Form.Label column sm={3}>
                                                Продукт
                                            </Form.Label>
                                            <Col sm={9}>
                                                <Form.Select
                                                    name="product"
                                                    aria-label="Оберіть продукт"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.product}
                                                >
                                                    {allProducts.map((product)=>(
                                                        <option key={product} value={product}>{product}</option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formCode">
                                            <Form.Label column sm={3}>
                                                Код
                                            </Form.Label>
                                            <Col sm={9}>
                                                <Form.Control
                                                    name="code"
                                                    type="text"
                                                    placeholder="D000"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.code}
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3" controlId="formCommUA">
                                            <Form.Label column sm={3}>
                                                Коментар UA
                                            </Form.Label>
                                            <Col sm={9}>
                                                <Form.Control
                                                    name="comment"
                                                    type="textarea"
                                                    placeholder=""
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.comment}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formCommRU">
                                            <Form.Label column sm={3}>
                                                Коментар RU
                                            </Form.Label>
                                            <Col sm={9}>
                                                <Form.Control
                                                    name="comment_ru"
                                                    type="textarea"
                                                    placeholder=""
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.comment_ru}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formCommNF">
                                            <Form.Label column sm={3}>
                                                Значення
                                            </Form.Label>
                                            <Col sm={9}>
                                                <Form.Control
                                                    name="comment_no_front"
                                                    type="textarea"
                                                    placeholder=""
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.comment_no_front}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formPriority">
                                            <Form.Label column sm={3}>
                                                Пріорітет
                                            </Form.Label>
                                            <Col sm={9}>
                                                <Form.Control
                                                    name="priority"
                                                    type="number"
                                                    placeholder=""
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.priority}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                                            <Col sm={{span: 10, offset: 3}}>
                                                <Form.Check
                                                    type="switch"
                                                    name="fl_autodec"
                                                    label="Авто"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.fl_autodec}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Col sm={{span: 10, offset: 3}}>
                                                <Button variant="success" type="submit">Додати</Button>
                                            </Col>
                                        </Form.Group>

                                    </Form>)}
                            </Formik>

                        </Modal.Body>
                    </>
                    :
                    <UseAlert opertype='ADD'  show={alertShow} header='Додати код' mainText={'Код '+formValues.code+ ' додано до продукту '+formValues.product}
                              toggleButton={() => setAlertShow(!alertShow)}/>
                }
        </Modal>
    );
}

export default ModalAddCode;