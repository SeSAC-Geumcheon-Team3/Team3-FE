// src/views/examples/FindPw.jsx
import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const FindPw = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
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
        <CardHeader className="bg-transparent pb-3">
          <div className="text-center mt-2 mb-3">
            <big>비밀번호 찾기</big>
          </div>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <Form role="form">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="이메일"
                  type="email"
                  autoComplete="new-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
              
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-circle-08" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="이름"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>

              
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-mobile-button" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="전화번호"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputGroup>
            </FormGroup>

            <div className="text-center">
              <Button className="my-4" color="primary" type="button" onClick={handleFindPw}>
                비밀번호 찾기
              </Button>
            </div>

          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default FindPw;
