import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Col, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const FindPw = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleFindPw = () => {
    if (!email) {
      alert('Please enter your email.');
      return;
    }

    // 여기에서 이메일로 임의의 비밀번호를 전송하는 로직을 추가합니다.
    // 예: API 호출하여 이메일로 비밀번호 전송
    // 실제로는 백엔드에서 비밀번호를 생성하여 이메일로 전송해야 합니다.

    alert(`A new password has been sent to ${email}`);
    navigate('/auth/login'); // 비밀번호 발송 후 로그인 페이지로 이동
  };

  const handleForgotId = () => {
    navigate('/auth/find-id'); // Forgot ID 버튼 클릭 시 FindId 페이지로 이동
  };

  const handleSignUp = () => {
    navigate('/auth/signup'); // Sign Up 버튼 클릭 시 Signup 페이지로 이동
  };

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-center mt-2 mb-3">
            <small>비밀번호 찾기</small>
          </div>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <Form role="form">
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="email"
                  autoComplete="new-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <div className="text-center">
              <Button className="my-4" color="primary" type="button" onClick={handleFindPw}>
                Find Password
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      <Row className="mt-4">
        <Col className="text-center">
          <Button className="my-2" color="link" onClick={handleForgotId}>
            Forgot ID?
          </Button>
        </Col>
        <Col className="text-center">
          <Button className="my-2" color="link" onClick={handleSignUp}>
            Sign Up
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default FindPw;
