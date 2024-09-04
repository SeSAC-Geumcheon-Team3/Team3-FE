import React from 'react';
import { Button, Card, CardHeader, CardBody, Container, Row, Col, FormGroup, Input, Form } from 'reactstrap';

const AccountDeletion = () => {
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col>
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="12">
                  <h3 className="mb-0">계정 탈퇴</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <p>현재 탈퇴하시면 보유하신 쿠폰과 포인트도 함께 사라져요. 추후에 동일 계정으로 재가입하셔도 쿠폰과 포인트 내역은 복구되지 않아요!</p>
              <p>탈퇴 후에는 작성하신 글을 수정 혹은 삭제하실 수 없어요. 탈퇴 신청 전에 꼭 확인해 주세요!</p>
              <Button color="danger" onClick={() => alert('탈퇴 처리')}>
                계정 탈퇴
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountDeletion;
