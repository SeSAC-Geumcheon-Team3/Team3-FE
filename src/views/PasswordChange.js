import { useState } from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from 'reactstrap';


export default function PasswordChange(){

    const [newPassword, setNewPassword] = useState("");     // 새 비밀번호
    const [confirmNewPassword, setConfirmNewPassword] = useState("");     // 새 비밀번호 확인

    return (
        <Row>
            <Col lg="6">
            <FormGroup>
                <label className="form-control-label" htmlFor="new-password">
                새 비밀번호
                </label>
                <Input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                />
            </FormGroup>
            </Col>
            <Col lg="6">
            <FormGroup>
                <label className="form-control-label" htmlFor="confirm-new-password">
                새 비밀번호 확인
                </label>
                <Input
                type="password"
                id="confirm-new-password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
            </FormGroup>
            </Col>
        </Row>
    )
}