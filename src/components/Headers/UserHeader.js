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
  ModalFooter
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

const Profile = () => {
  // 상태 관리
  const [formValues, setFormValues] = useState({
    nickname: "관리왕 새싹이",
    email: "example@example.com",
    firstName: "김새싹",
    phone: "010-1234-5678",
    password: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");

  // 폼 값 업데이트 핸들러
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value
    });
  };

  // 비밀번호 확인 및 정보 수정 활성화 핸들러
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 확인 로직 (예: 현재 비밀번호가 'correct-password'인지 확인)
    if (currentPassword === "correct-password") {
      setIsEditing(true);
      setModal(false);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  // 모달 토글 핸들러
  const toggleModal = () => setModal(!modal);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/team-4-800x800.jpg").default}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
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
                  <div className="gender-selection my-3">
                    <label>성별</label>
                    <div>
                      <input type="radio" id="male" name="gender" value="male" />
                      <label htmlFor="male">남자</label>
                    </div>
                    <div>
                      <input type="radio" id="female" name="gender" value="female" />
                      <label htmlFor="female">여자</label>
                    </div>
                    <div>
                      <input type="radio" id="none" name="gender" value="none" />
                      <label htmlFor="none">선택 안함</label>
                    </div>
                  </div>

                  {/* 생년월일 선택 박스 */}
                  <div className="birthdate-selection my-3">
                    <label>생년월일</label>
                    <div>
                      {/* 연도 선택 */}
                      <select id="year" name="year">
                        <option value="">년</option>
                        {Array.from({ length: 105 }, (_, i) => (
                          <option key={2024 - i} value={2024 - i}>
                            {2024 - i}
                          </option>
                        ))}
                      </select>

                      {/* 월 선택 */}
                      <select id="month" name="month">
                        <option value="">월</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>

                      {/* 일 선택 */}
                      <select id="day" name="day">
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
                  <div className="household-size-selection my-3">
                    <label>가구원 수</label>
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
                      계정 정보 수정
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">User information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="nickname">
                            닉네임
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={formValues.nickname}
                            id="nickname"
                            placeholder="Nickname"
                            type="text"
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="email">
                            이메일
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={formValues.email}
                            id="email"
                            placeholder="example@example.com"
                            type="email"
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="firstName">
                            이름
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={formValues.firstName}
                            id="firstName"
                            placeholder="First name"
                            type="text"
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="phone">
                            전화번호
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={formValues.phone}
                            id="phone"
                            placeholder="Phone"
                            type="text"
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="password">
                            비밀번호
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={formValues.password}
                            id="password"
                            placeholder="Password"
                            type="password"
                            onChange={handleInputChange}
                            disabled={!isEditing}
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
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>비밀번호 확인</ModalHeader>
        <ModalBody>
          <Form onSubmit={handlePasswordSubmit}>
            <FormGroup>
              <label htmlFor="current-password">현재 비밀번호</label>
              <Input
                type="password"
                id="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="현재 비밀번호"
              />
            </FormGroup>
            <ModalFooter>
              <Button color="primary" type="submit">
                확인
              </Button>
              <Button color="secondary" onClick={toggleModal}>
                취소
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Profile;
