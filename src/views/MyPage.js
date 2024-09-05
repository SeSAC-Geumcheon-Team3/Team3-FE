import React, { useEffect, useState } from 'react';
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
} from 'reactstrap';
import UserHeader from 'components/Headers/UserHeader.js';
import { useNavigate } from 'react-router-dom'; // useNavigate로 변경
import { useRecoilValue } from 'recoil';
import { accessTokenState } from 'states/accessTokenAtom';
import styles from './MyPage.module.css'
import putMemberInfo from 'apis/member/putMemberInfo';
import getAuthByPW from 'apis/member/getAuthByPW';
import getMemberInfo from 'apis/member/getMemberInfo';

const MyPage = () => {
  const [modalOpen, setModalOpen] = useState(false);      // 비밀번호 확인 모달
  const [inputPassword, setInputPassword] = useState(""); // 사용자 인증 비밀번호
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);  //비밀번호 확인 여부 검증

  const accessToken = useRecoilValue(accessTokenState); // 토큰값
  
  const [memberInfo, setMemberInfo] = useState();

  const [changeMemberInfo, setChangeMemberInfo] = useState(false);  //사용자 정보 수정 상태(활성화:true, 비활성화:false)  
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [sex, setSex] = useState("");
  const [household, setHousehold] = useState(0);
  const [notice, setNotice] = useState();

  const navigate = useNavigate();

  const onClickChangeMemberInfo = () => setChangeMemberInfo(true);

  const toggleModal = () => setModalOpen(true);

  // 입력값 핸들러
  const handleInputChange = (setter) => (e) => setter(e.target.value);

  /**
   * 비밀번호 검증
   */
  const handlePasswordVerification = () => {
    getAuthByPW(accessToken, inputPassword)
      .then(res=>{
        // 비밀번호 검증 후 비밀번호 변경 모드 활성화
        setIsPasswordVerified(true)
        window.location.href="/admin/PasswordChange"
    })
      .catch(err=>{
        // 인증 실패
        setIsPasswordVerified(false)
        setInputPassword("");
        alert("비밀번호가 일치하지 않습니다.");
    })
  };

  // 회원 탈퇴 버튼 클릭 시 라우팅
  const handleAccountDeletion = () => {
    navigate('/admin/account-deletion'); // 절대 경로를 사용하여 이동
  };

  // 비밀번호 수정 버튼 클릭
  const onClickEditPW = () => setModalOpen(!modalOpen);


  /**
   * 회원정보 수정 버튼 클릭
   */
  const onClickEditBtnHandler = () => {
    const data = {
      "name":name,
      "email":email,
      "nickname":nickname,
      "phone":phone,
      "profile_img":profile,
      "birth":birth,
      "sex":sex,
      "household":household,
      "notice":notice,
    }
    putMemberInfo(accessToken, data).then(res=>{
      // 1. 회원 정보 수정이 완료되었다는 메시지 띄우기
      alert(res.data.message);

      // 2. 원래 페이지로 새로고침 
      window.location.href='/admin/mypage'; // 절대 경로를 사용하여 이동

    }).catch(err=>alert(err))
  }

  /**
   * 회원 정보 받아오기
   * @returns 
   */
  const fetchData = async () => {
    return await getMemberInfo(accessToken)
  }


  // memberInfo에 변화가 생길 때 마다 페이지 새로고침
  useEffect(()=>{
    
    fetchData().then(res=>{
      console.log(res.data)

      // 사용자 정보 state에 입력
      setMemberInfo(res.data)
      setEmail(res.data.email);
      setName(res.data.name);
      setNickname(res.data.nickname);
      setBirth(res.data.birth);
      setPhone(res.data.phone);
      setSex(res.data.sex);
      setHousehold(res.data.household);
      setNotice(res.data.notice);

    }).catch(err=> console.log(err))

  },[])

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
                
                <div className={styles.profileHolder}>
                  <img src={profile||'https://stickershop.line-scdn.net/stickershop/v1/product/1345501/LINEStorePC/main.png?v=1'} style={{ width: '200px', height: '200px', objectFit: 'cover' }} alt="profile"  />
                </div>
                
                <div className="text-center">
                  <h3>{name}</h3>
                  <hr className="my-4" />
                  <div className="my-3">
                    <h5>성별: {sex} </h5>
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

                  {/* 회원 탈퇴 버튼 */}
                  <div className="my-3">
                    <Button color="danger" onClick={handleAccountDeletion} style={{width:'40%'}}>
                      회원 탈퇴
                    </Button>
                    <Button color="primary" onClick={onClickEditPW} style={{width:'40%'}}>
                          비밀번호 수정
                    </Button>
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
                    <h2 className="mb-0">내 정보</h2>
                  </Col>
                  <Col className="text-right" xs="4" style={{display:"flex", justifyContent: "flex-end"}}>
                    <Button className={styles.btn} color="primary" onClick={onClickChangeMemberInfo} style={{ display: changeMemberInfo ? 'none' : 'block'}}>
                      내 정보 수정
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
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
                            value={nickname}
                            id="input-username"
                            placeholder="사용할 닉네임을 입력하세요"
                            type="text"
                            disabled={!changeMemberInfo} // 비밀번호 검증 전에는 비활성화
                            onChange={handleInputChange(setNickname)}
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
                            defaultValue={email}
                            placeholder='사용할 이메일을 입력하세요'
                            type="email"
                            disabled={!changeMemberInfo} // 비밀번호 검증 전에는 비활성화
                            onChange={handleInputChange(setEmail)}
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
                            defaultValue={name}
                            id="input-first-name"
                            placeholder="이름을 입력하세요"
                            type="text"
                            disabled={!changeMemberInfo} // 비밀번호 검증 전에는 비활성화
                            onChange={handleInputChange(setName)}
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
                            defaultValue={phone}
                            id="input-phone"
                            placeholder="전화번호를 입력하세요"
                            type="text"
                            disabled={!changeMemberInfo} // 비밀번호 검증 전에는 비활성화
                            onChange={handleInputChange(setPhone)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    </Row>

                    <div className={styles.btn_wrapper}>
                      <Button color="primary" onClick={onClickEditBtnHandler} style={{ display: changeMemberInfo ? 'block' : 'none' }}>
                        수정
                      </Button>
                    </div>
                    
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

export default MyPage;
