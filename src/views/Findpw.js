import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Col, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import getAuthByMemberInfo from 'apis/member/getAuthByMemberInfo';
import { useSetRecoilState } from 'recoil';
import { pwResetAuthState } from 'states/pwResetAuthAtom';

const FindPw = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  
  const setPwChangeAuth = useSetRecoilState(pwResetAuthState);

  const handleFindPw = () => {
    
    const data = {
      "email":email,
      "name":name,
      "phone":phone
    }

    getAuthByMemberInfo(data).then(res=>{

      setPwChangeAuth(res.data.access_token)
      navigate('/admin/password');

    }).catch(err=>alert(err))
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
                    <i className="ni ni-user" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Name"
                  type="text"
                  autoComplete="new-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-mobile-button" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Phone Number"
                  type="text"
                  autoComplete="new-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
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
