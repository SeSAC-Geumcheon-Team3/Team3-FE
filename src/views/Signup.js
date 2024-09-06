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
        navigate('/auth/signin'); // 로그인 페이지로 리디렉션
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
          <CardHeader className="bg-transparent">
            <div className="text-center mt-2 mb-1">
              <big>회원가입</big>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form onSubmit={handleSubmit} role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupText>
                    <i className="ni ni-circle-08" />
                  </InputGroupText>
                  <Input
                    name="name"
                    placeholder="이름"
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
                    placeholder="이메일"
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
                    placeholder="비밀번호"
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
                    <i className="ni ni-satisfied" />
                  </InputGroupText>
                  <Input
                    name="nickname"
                    placeholder="닉네임"
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
                    placeholder="전화번호"
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
                  <option value="">성별</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
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
                  placeholder="가구수"
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
                  label="이메일 수신을 위한 개인정보 제공에 동의합니다"
                  checked={formData.notice}
                  onChange={handleChange}
                />
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  회원가입
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
              onClick={()=>navigate('/auth/signin')}
            >
              <small>계정이 있으신가요? &nbsp;로그인 하러 가기</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Signup;
