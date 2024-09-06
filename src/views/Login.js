// src/views/examples/Login.jsx
import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import postLogin from 'apis/member/postLogin';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  // "Forgot id?" 클릭 핸들러 함수
  const handleFindId = () => {
    navigate('/auth/findid');
  };

  // "Forgot password?" 클릭 핸들러 함수
  const handleFindPw = () => {
    navigate('/auth/findpw');
  };

  // 로그인 수행
  const handleClickeLoginBtn = () => {
    const data = {
      "email":email,
      "password":pw
    }

    // 로그인 성공 시 페이지 이동
    postLogin(data).then(()=>{
      navigate('/admin/index')
    }).catch(err=>alert(err))
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-1">
            <div className="text-center mt-2 mb-3">
              <big>로그인 하시겠습니까?</big>
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
                    placeholder="이메일"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="비밀번호"
                    type="password"
                    autoComplete="new-password"
                    value={pw}
                    onChange={e=>setPw(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={handleClickeLoginBtn}>
                  로그인
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
                className="text-light"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  handleFindId(); // 클릭 시 handleFindId 함수 호출
                }}
              >
              <small>ID를 까먹었나요?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                handleFindPw(); // 클릭 시 handleFindPw 함수 호출
              }}
            >
              <small>비밀번호를 까먹었나요?</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
