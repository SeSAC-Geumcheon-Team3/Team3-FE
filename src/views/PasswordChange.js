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
    Col
} from 'reactstrap';
import Header from "components/Headers/Header.js";
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { pwResetAuthState } from 'states/pwResetAuthAtom';
import putPassword from 'apis/member/putPassword';
import { removeCookie } from 'utils/cookie';

export default function PasswordChange(){

    const [newPW, setNewPW] = useState("");     // 새 비밀번호
    const [confirmPW, setConfirmPW] = useState("");     // 새 비밀번호 확인
    const pwResetAuth = useRecoilValue(pwResetAuthState);
    const resetPwResetAuth = useResetRecoilState(pwResetAuthState);
    
    const handleNewPW = e => setNewPW(e.target.value);
    const handleConfirmPW = e => setConfirmPW(e.target.value)

    /**
     * 비밀번호 수정 버튼 클릭
     * 비밀번호 설정 및 전송
     */
    const onClickPasswordEditBtn = () => {
        newPW===newPW?
            putPassword(pwResetAuth, newPW).then(res=>{
                alert(res.data.message);
                resetPwResetAuth();
                removeCookie('accessToken')
                window.location.href="/auth/login"
            }).catch(err=>alert(err))
        :
            alert("비밀번호가 일치하지 않습니다")
    }

    return (
    <>
      <Header />
      <Container className="mt--7" fluid>

        <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h2 className="mb-0">새 비밀번호 입력</h2>
                  </Col>
                </Row>
              </CardHeader>

              <CardBody>
                <Form>
                    <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                                <FormGroup>
                                <Input
                                    className="form-control-alternative"
                                    value={newPW}
                                    id="new-pw"
                                    placeholder="새로운 비밀번호를 입력하세요"
                                    type="password"
                                    onChange={handleNewPW}
                                />
                                </FormGroup>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col lg="6">
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        value={confirmPW}
                                        id="confirm-new-pw"
                                        placeholder="동일한 비밀번호를 입력하세요"
                                        type="password"
                                        onChange={handleConfirmPW}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Button color="primary" onClick={onClickPasswordEditBtn}>
                            비밀번호 수정
                        </Button>
                    
                    </div>
                </Form>
              </CardBody>
            </Card>
    </Container>
    </>
    )
}