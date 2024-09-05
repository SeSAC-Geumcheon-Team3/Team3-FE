import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Col,
  CustomInput,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom'; // react-router-dom 버전 6 이상
import postSignup from 'apis/auth/postSignUp'; // 경로를 올바르게 변경

const Signup = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 리디렉션 처리
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    nickname: '',
    phone: '',
    notice: false,
    birth: '',
    sex: '',
    household: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 모든 입력 필드가 채워졌는지 확인 (체크 박스 제외)
    const isFormValid = [
      formData.name,
      formData.email,
      formData.password,
      formData.nickname,
      formData.phone,
      formData.birth,
      formData.sex,
      formData.household,
    ].every(field => field.trim() !== ''); // 공백 문자열을 제외

    // 체크 박스가 체크되지 않은 경우 경고 메시지
    if (!formData.notice) {
      alert('동의 체크 박스를 체크해야 가입할 수 있습니다.');
      return;
    }

    // 입력 필드가 모두 채워지지 않은 경우 경고 메시지
    if (!isFormValid) {
      alert('모든 입력 필드를 채워야 가입할 수 있습니다.');
      return;
    }

    // formData를 서버에 전송
    postSignup(
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        phone: formData.phone,
        notice: formData.notice ? "True" : "False",
        birth: formData.birth,
        household: formData.household,
      },
      (response) => {
        alert('회원가입이 완료되었습니다! 로그인 페이지로 리디렉션합니다.');
        navigate('/login'); // 로그인 페이지로 리디렉션
      },
      (error) => {
        console.error('회원가입 오류:', error);
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    );
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-center mt-2 mb-3">
              <small>회원가입</small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form onSubmit={handleSubmit} role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupText>
                    <i className="ni ni-user" />
                  </InputGroupText>
                  <Input
                    name="name"
                    placeholder="Name"
                    type="text"
                    autoComplete="new-name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                  <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                  <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupText>
                    <i className="ni ni-hat-3" />
                  </InputGroupText>
                  <Input
                    name="nickname"
                    placeholder="Nickname"
                    type="text"
                    autoComplete="new-nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupText>
                    <i className="ni ni-mobile-button" />
                  </InputGroupText>
                  <Input
                    name="phone"
                    placeholder="Phone Number"
                    type="text"
                    autoComplete="new-phonenumber"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <Input
                  name="sex"
                  type="select"
                  value={formData.sex}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Input>
              </FormGroup>
              <FormGroup className="mb-3">
                <Input
                  name="birth"
                  type="date"
                  value={formData.birth}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <Input
                  name="household"
                  placeholder="Number of Family Members"
                  type="number"
                  min="0" // 최소값을 0으로 설정
                  value={formData.household}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup check className="mt-4">
                <CustomInput
                  type="checkbox"
                  id="notice"
                  name="notice"
                  label="I agree to receive notifications"
                  checked={formData.notice}
                  onChange={handleChange}
                />
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign Up
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
              onClick={(e) => e.preventDefault()}
            >
              <small>Already have an account? Login</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Signup;
