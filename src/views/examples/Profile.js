import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태
  const [inputPassword, setInputPassword] = useState(""); // 사용자가 입력한 비밀번호
  const [isPasswordVerified, setIsPasswordVerified] = useState(false); // 비밀번호 검증 결과

  const toggleModal = () => setModalOpen(!modalOpen);

  // 비밀번호 확인 로직
  const handlePasswordVerification = () => {
    const storedPassword = "123456"; // 서버에서 가져온 비밀번호로 대체 필요
    if (inputPassword === storedPassword) {
      setIsPasswordVerified(true);
      toggleModal();
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              {/* 기존 프로필 정보 */}
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>

                <div className="text-center">
                  <h3>Jessica Jones</h3>
                  <hr className="my-4" />
{/* 성별 선택 체크박스 */}
<div className="my-3">
                    <h5>성별:</h5>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ margin: '0 10px' }}>
                        <input type="radio" id="male" name="gender" value="male" />
                        <label htmlFor="male">남자</label>
                      </div>
                      <div style={{ margin: '0 10px' }}>
                        <input type="radio" id="female" name="gender" value="female" />
                        <label htmlFor="female">여자</label>
                      </div>
                      <div style={{ margin: '0 10px' }}>
                        <input type="radio" id="none" name="gender" value="none" />
                        <label htmlFor="none">선택 안함</label>
                      </div>
                    </div>
                  </div>

                  {/* 생년월일 선택 박스 */}
                  <div className="my-3">
                    <h5>생년월일:</h5>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <select id="year" name="year" style={{ margin: '0 5px' }}>
                        <option value="">년</option>
                        {Array.from({ length: 105 }, (_, i) => (
                          <option key={2024 - i} value={2024 - i}>
                            {2024 - i}
                          </option>
                        ))}
                      </select>
                      <select id="month" name="month" style={{ margin: '0 5px' }}>
                        <option value="">월</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <select id="day" name="day" style={{ margin: '0 5px' }}>
                        <option value="">일</option>
                        {Array.from({ length: 31 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 가구원 수 선택 박스 */}
                  <div className="my-3">
                    <h5>가구원 수:</h5>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <select id="household-size" name="household-size">
                        <option value="">선택하세요</option>
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}명
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="primary" onClick={toggleModal}>
                      개인 정보 수정
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">User information</h6>
                  <div className="pl-lg-4">
                    {/* 닉네임, 이메일, 이름, 전화번호 필드 */}
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-nickname">
                            닉네임
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="관리왕 새싹이"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            disabled={!isPasswordVerified} // 비밀번호 검증 전에는 비활성화
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email">
                            이메일
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="example@example.com"
                            type="email"
                            disabled={!isPasswordVerified} // 비밀번호 검증 전에는 비활성화
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-first-name">
                            이름
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="김새싹"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            disabled={!isPasswordVerified} // 비밀번호 검증 전에는 비활성화
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-phone">
                            전화번호
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="010-1234-5678"
                            id="input-phone"
                            placeholder="Phone"
                            type="text"
                            disabled={!isPasswordVerified} // 비밀번호 검증 전에는 비활성화
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-password">
                            비밀번호
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-password"
                            placeholder="Password"
                            type="password"
                            disabled={!isPasswordVerified} // 비밀번호 검증 전에는 비활성화
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

{/* 비밀번호 확인 모달 */}
<Modal isOpen={modalOpen} toggle={toggleModal}>
  <ModalHeader>
    <h1 style={{ fontSize: '2rem', margin: '0', marginBottom: '-4rem' }}>
      계정 정보 확인
    </h1>
  </ModalHeader>
  <ModalBody>
    <hr style={{ marginBottom: '1rem' }} />
    <FormGroup>
      <label>비밀번호를 입력하세요:</label>
      <Input
        type="password"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
      />
      <small className="text-muted mt-2 d-block">
        회원님의 정보를 안전하게 보호하기 위해 비밀번호를 입력 후 계정 정보에 접근 가능합니다.
      </small>
    </FormGroup>
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={handlePasswordVerification}>
      확인
    </Button>
    <Button color="secondary" onClick={toggleModal}>
      취소
    </Button>
  </ModalFooter>
</Modal>

    </>
  );
};

export default Profile;
