import React from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const AccountDeletion = () => {
  const navigate = useNavigate();

  const handleConfirmDeletion = () => {
    // 실제 탈퇴 처리 로직을 추가하세요
    alert("회원 탈퇴가 완료되었습니다.");
    navigate('/'); // 홈 페이지로 리디렉션
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
    </>
  );
};

export default AccountDeletion;
