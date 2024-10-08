
import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroup, InputGroupText, Col, Modal, ModalHeader, ModalBody, ModalFooter, Row } from 'reactstrap';
import postFindId from 'apis/auth/postFindId';
import './FindId.css'; // CSS 파일을 import 합니다.
import { useNavigate } from 'react-router-dom';

const FindId = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const toggleModal = () => setModal(!modal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // "Forgot id?" 클릭 핸들러 함수
  const handleFindId = () => {
    navigate('/auth/findid');
  };

  // "Forgot password?" 클릭 핸들러 함수
  const handleFindPw = () => {
    navigate('/auth/findpw');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.phone) {
      alert('이름과 전화번호를 입력해주세요.');
      return;
    }
  
    try {
      const response = await postFindId(formData.name, formData.phone);
      const { email } = response; // 응답에서 이메일 추출
  
      if (email) {
        setModalContent(`등록된 이메일: ${email}`);
      } else {
        setModalContent('등록된 이메일이 없습니다.');
      }
      toggleModal(); // 모달 열기
    } catch (error) {
      console.error('아이디 찾기 요청 중 오류 발생:', error);
      setModalContent('아이디 찾기 요청 중 오류가 발생했습니다.');
      toggleModal(); // 모달 열기
    }
  };

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-center mt-2 mb-3">
            <small className="find-id-title">아이디 찾기</small>
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
                  <i className="ni ni-mobile-button" />
                </InputGroupText>
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
            <div className="text-center">
              <Button className="my-4" color="primary" type="submit">
                Find ID
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

      {/* 모달 창 */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal} className="modal-header-custom">아이디 찾기 결과</ModalHeader>
        <ModalBody>
          {modalContent}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>navigate('/auth/signin')}>확인</Button>
        </ModalFooter>
      </Modal>
    </Col>
  );
};

export default FindId;
