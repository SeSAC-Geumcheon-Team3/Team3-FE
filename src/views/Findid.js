import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom'; // react-router-dom 버전 6 이상

const FindId = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const toggleModal = () => setModal(!modal);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const mockResponse = getMockEmail(formData.name, formData.phone, formData.email);
      const { email } = mockResponse;

      setModalContent(`등록된 이메일: ${email}`);
      toggleModal(); // 모달 열기
    } catch (error) {
      console.error('아이디 찾기 요청 중 오류 발생:', error);
      alert('아이디 찾기 요청 중 오류가 발생했습니다.');
    }
  };

  const getMockEmail = (name, phone, email) => {
    if (name === '홍길동' && phone === '1234567890' && email === 'honggildong@example.com') {
      return { email: 'honggildong@example.com' };
    } else if (name === '김철수' && phone === '0987654321' && email === 'kimcheolsu@example.com') {
      return { email: 'kimcheolsu@example.com' };
    } else {
      return { email: 'unknown@example.com' };
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
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-mobile-button" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="phone"
                  placeholder="전화번호"
                  type="text"
                  autoComplete="new-phone"
                  value={formData.phone}
                  onChange={handleChange}
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
                  name="email"
                  placeholder="이메일"
                  type="email"
                  autoComplete="new-email"
                  value={formData.email}
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

      {/* 모달 창 */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>아이디 찾기 결과</ModalHeader>
        <ModalBody>
          {modalContent}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>확인</Button>
        </ModalFooter>
      </Modal>
    </Col>
  );
};

export default FindId;
