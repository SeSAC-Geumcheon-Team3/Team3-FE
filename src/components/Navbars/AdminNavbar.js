/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import getMemberInfo from "apis/member/getMemberInfo";
import getProfile from "apis/member/getProfile";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { useRecoilValue } from "recoil";
import { pwResetAuthState } from "states/pwResetAuthAtom";
import { getCookie } from "utils/cookie";

const AdminNavbar = (props) => {

  const pwResetAuth = useRecoilValue(pwResetAuthState);
  const [name, setName] = useState('');
  const [profile, setProfile] = useState('');
  const currentPath = window.location.pathname;
  const navs = {
    'dashboard':'생필품 목록 조회',
    'mypage':'마이페이지',
    'admin-detail':'관리자용 대시보드',
    'add-product':'생필품 추가'
  }

  const fetchName = async () => {
    return await getMemberInfo()
  }

  const fetchProfile = async() => {
    return await getProfile()
  }

  useEffect(()=>{
    if(!getCookie('pwResetAuth')){
      fetchName().then(res=>{
        setName(res.data.name)
      })

      fetchProfile().then(res=>{
        setProfile(URL.createObjectURL(res.data))
      })
    }
  }, [])

  //
  if (!getCookie('pwResetAuth')){
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h2 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {navs[currentPath.split('/')[2]]}
            </Link>
            
            {/* 헤더 */}
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={profile}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-1 text-sm font-weight-bold">
                        {name}&nbsp;
                      </span>
                      <span className="mb-0 text-sm font-weight-light">
                        님, 환영합니다!
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">내 설정</h6>
                  </DropdownItem>
                  <DropdownItem to="/member/mypage" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>마이 페이지</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem to='/member/logout' tag={Link}>{/**href="#pablo" onClick={(e) => e.preventDefault()} */}
                    <i className="ni ni-user-run" />
                    <span>로그아웃</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }

  else {
    return(
      <></>
    )
  }
};

export default AdminNavbar;
