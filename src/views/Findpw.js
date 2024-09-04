// src/views/examples/FindPw.jsx
import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const FindPw = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleFindPw = () => {
    // 여기에서 이메일 발송 로직을 추가합니다.
    // 예: API 호출하여 이메일 발송

    alert(`Password reset link sent to ${email}`);
    navigate('/auth/login'); // 이메일 발송 후 로그인 페이지로 이동
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
    </Col>
  );
};

export default FindPw;
