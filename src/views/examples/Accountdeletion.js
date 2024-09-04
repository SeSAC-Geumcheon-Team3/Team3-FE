import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Row, Col, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const AccountDeletion = () => {
  const [isChecked, setIsChecked] = useState(false); // Checkbox 상태 관리
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 관리
  const navigate = useNavigate();

  // Checkbox 상태 업데이트
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // 탈퇴 확인
  const handleConfirmDeletion = () => {
    if (!isChecked) {
      setModalOpen(true); // 동의하지 않았을 때 모달 열기
      return;
    }
    // 실제 탈퇴 처리 로직을 추가하세요
    alert("회원 탈퇴가 완료되었습니다.");
    navigate('/'); // 홈 페이지로 리디렉션
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0"> {/* 배경색과 그림자 효과 적용 */}
          <CardHeader className="bg-transparent pb-5">
            <div className="text-center mt-2 mb-3">
              <small>회원 탈퇴 안내</small> {/* 제목 텍스트 */}
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <p>
                  지금 탈퇴하시면 보유하신 쿠폰과 포인트도 함께 사라져요. 
                  추후에 동일 계정으로 재가입하셔도 쿠폰과 포인트 내역은 복구되지 않아요! 
                  탈퇴 후에는 작성하신 글을 수정 혹은 삭제하실 수 없어요. 
                  탈퇴 신청 전에 꼭 확인해 주세요!
                </p>
                <div className="form-check">
                  <Input 
                    type="checkbox" 
                    id="termsCheck" 
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="termsCheck">
                    회원 탈퇴 유의사항을 확인하였으며 동의합니다.
                  </label>
                </div>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="danger" onClick={handleConfirmDeletion}>
                  탈퇴하기
                </Button>
                <Button className="my-4" color="secondary" onClick={() => navigate(-1)}>
                  취소
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>

      {/* 동의하지 않았을 때의 모달 */}
      <Modal isOpen={modalOpen} toggle={handleCloseModal}>
        <ModalHeader>탈퇴 동의 필요</ModalHeader>
        <ModalBody>
          <p>동의하기 버튼을 누르시지 않으면 탈퇴가 불가능합니다.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCloseModal}>
            확인
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AccountDeletion;
