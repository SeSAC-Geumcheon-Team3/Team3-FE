import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Table, ListGroup, ListGroupItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import styles from './Admindetail.styles.css';
import getMemberList from 'apis/admin/getMemberList';
import deleteMember from 'apis/admin/deleteMember';

const AdminDetail = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [membersPerPage] = useState(6); // 페이지 당 회원 수
  const [message, setMessage] = useState('');

  const fetchMembers = (page) => {
    getMemberList(page, membersPerPage, 
      (response) => {
        setMembers(response.data.items || []);
        setTotalPages(response.data.total_pages || 1);
        setMessage('');
      },
      (error) => {
        console.error(error);
        setMessage('회원 목록을 불러오는 데 실패했습니다.');
      }
    );
  };

  useEffect(() => {
    fetchMembers(currentPage);
  }, [currentPage]);

  const handleDeleteMember = (member) => {
    if (window.confirm(`${member.name}님을 강제 탈퇴하시겠습니까?`)) {
      deleteMember(member.member_idx, 
        (response) => {
          alert(response.message);
          fetchMembers(currentPage);
          setSelectedMember(null);
        },
        (error) => {
          console.error(error);
          alert('회원 삭제에 실패했습니다.');
        }
      );
    }
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid className={styles.container}>
      <Row className="mb-4">
        <Col lg="3" md="6">
          <Card className="shadow-sm">
            <CardBody>
              <h6>이름</h6>
              <h3>{selectedMember ? selectedMember.name : ""}</h3>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" md="6">
          <Card className="shadow-sm">
            <CardBody>
              <h6>이메일</h6>
              <h3>{selectedMember ? selectedMember.email : ""}</h3>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" md="6">
          <Card className="shadow-sm">
            <CardBody>
              <h6>권한</h6>
              <h3>{selectedMember ? selectedMember.authority : ""}</h3>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" md="6">
          <Card className="shadow-sm">
            <CardBody>
              <h6>가구 수</h6>
              <h3>{selectedMember ? selectedMember.household : ""}</h3>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg="4" md="12">
          <Card className="shadow">
            <CardBody>
              <h2>사용자 목록</h2>
              <Table hover className={styles.table}>
                <thead>
                  <tr>
                    <th>사용자 ID</th>
                    <th>이름</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMembers.length > 0 ? (
                    currentMembers.map((member) => (
                      <tr key={member.member_idx} onClick={() => setSelectedMember(member)}>
                        <td>{member.member_idx}</td>
                        <td>{member.name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">{message || "회원이 없습니다."}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Pagination className={styles.pagination}>
                <PaginationItem className={styles.pageItem} disabled={currentPage === 1}>
                  <PaginationLink
                    previous
                    href="#"
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </PaginationLink>
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i} className={styles.pageItem} active={i + 1 === currentPage}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem className={styles.pageItem} disabled={currentPage === totalPages}>
                  <PaginationLink
                    next
                    href="#"
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  >
                    Next
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </CardBody>
          </Card>
        </Col>
        <Col lg="8" md="12">
          {selectedMember && (
            <Card className="shadow">
              <CardBody>
                <h2>사용자 정보</h2>
                <ListGroup>
                  <ListGroupItem><strong>사용자 ID:</strong> {selectedMember.member_idx}</ListGroupItem>
                  <ListGroupItem><strong>이름:</strong> {selectedMember.name}</ListGroupItem>
                  <ListGroupItem><strong>이메일:</strong> {selectedMember.email}</ListGroupItem>
                  <ListGroupItem><strong>닉네임:</strong> {selectedMember.nickname}</ListGroupItem>
                  <ListGroupItem><strong>전화번호:</strong> {selectedMember.phone}</ListGroupItem>
                  <ListGroupItem><strong>권한:</strong> {selectedMember.authority}</ListGroupItem>
                  <ListGroupItem>
                    <strong>프로필 이미지:</strong>
                    <img src={selectedMember.profile_image} alt="profile" style={{ width: '50px' }} />
                  </ListGroupItem>
                  <ListGroupItem><strong>알림 설정:</strong> {selectedMember.notice}</ListGroupItem>
                  <ListGroupItem><strong>생일:</strong> {selectedMember.birth}</ListGroupItem>
                  <ListGroupItem><strong>성별:</strong> {selectedMember.sex}</ListGroupItem>
                  <ListGroupItem><strong>가구 수:</strong> {selectedMember.household}</ListGroupItem>
                </ListGroup>
                <Button color="danger" className="mt-3" onClick={() => handleDeleteMember(selectedMember)}>
                  회원 삭제
                </Button>
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDetail;
