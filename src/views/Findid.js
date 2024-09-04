import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom'; // react-router-dom 버전 6 이상

const FindId = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  const navigate = useNavigate(); // useNavigate 훅을 사용하여 리디렉션 처리

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 간단한 유효성 검사
    if (!formData.name || !formData.phone) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    
    try {
      // 백엔드 API 호출
      const response = await fetch('/api/find-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // 이메일을 포함한 응답 데이터
      const { email } = data;

      // 이메일을 마스킹 없이 팝업으로 표시
      alert(`등록된 이메일: ${email}`);
      
      // 필요 시 리디렉션
      // navigate('/some-page');

    } catch (error) {
      console.error('아이디 찾기 요청 중 오류 발생:', error);
      alert('아이디 찾기 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-center mt-2 mb-3">
            <small>아이디 찾기</small>
          </div>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <Form onSubmit={handleSubmit} role="form">
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-user" />
                  </InputGroupText>
                </InputGroupAddon>
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
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-mobile-button" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="phone"
                  placeholder="Phone Number"
                  type="text"
                  autoComplete="new-phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>
            <div className="text-center">
              <Button className="my-4" color="primary" type="submit">
                Find ID
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default FindId;
