import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  ListGroup,
  ListGroupItem,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

// 예시 현재 사용자 ID
const currentUserId = 1;

const postsPerPage = 25;

// 커뮤니티 게시물 작성 및 목록 컴포넌트
const CommunityPost = () => {
  // 26개의 게시물 데이터
  const [posts, setPosts] = useState([
    { id: 1, userId: 1, content: 'A', likes: 0, liked: false },
    { id: 2, userId: 1, content: 'B', likes: 0, liked: false },
    { id: 3, userId: 1, content: 'C', likes: 0, liked: false },
    { id: 4, userId: 1, content: 'D', likes: 0, liked: false },
    { id: 5, userId: 1, content: 'E', likes: 0, liked: false },
    { id: 6, userId: 1, content: 'F', likes: 0, liked: false },
    { id: 7, userId: 1, content: 'G', likes: 0, liked: false },
    { id: 8, userId: 1, content: 'H', likes: 0, liked: false },
    { id: 9, userId: 1, content: 'I', likes: 0, liked: false },
    { id: 10, userId: 1, content: 'J', likes: 0, liked: false },
    { id: 11, userId: 1, content: 'K', likes: 0, liked: false },
    { id: 12, userId: 1, content: 'L', likes: 0, liked: false },
    { id: 13, userId: 1, content: 'M', likes: 0, liked: false },
    { id: 14, userId: 1, content: 'N', likes: 0, liked: false },
    { id: 15, userId: 1, content: 'O', likes: 0, liked: false },
    { id: 16, userId: 1, content: 'P', likes: 0, liked: false },
    { id: 17, userId: 1, content: 'Q', likes: 0, liked: false },
    { id: 18, userId: 1, content: 'R', likes: 0, liked: false },
    { id: 19, userId: 1, content: 'S', likes: 0, liked: false },
    { id: 20, userId: 1, content: 'T', likes: 0, liked: false },
    { id: 21, userId: 1, content: 'U', likes: 0, liked: false },
    { id: 22, userId: 1, content: 'V', likes: 0, liked: false },
    { id: 23, userId: 1, content: 'W', likes: 0, liked: false },
    { id: 24, userId: 1, content: 'X', likes: 0, liked: false },
    { id: 25, userId: 1, content: 'Y', likes: 0, liked: false },
    { id: 26, userId: 1, content: 'Z', likes: 0, liked: false },
  ]);

  const [newPost, setNewPost] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 인라인 스타일 객체
  const styles = {
    postContent: {
      maxWidth: '100%',
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
    },
    postActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: '10px',
    },
    likeIcon: {
      fontSize: '20px',
      color: 'gray',
      cursor: 'pointer',
    },
    likedIcon: {
      fontSize: '20px',
      color: 'red',
      cursor: 'pointer',
    },
  };

  // 페이지 이동 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 게시물 추가 핸들러
  const handleAddPost = () => {
    if (newPost.trim()) {
      setPosts([...posts, { id: posts.length + 1, userId: currentUserId, content: newPost, likes: 0, liked: false }]);
      setNewPost('');
    }
  };

  // 게시물 좋아요/싫어요 핸들러
  const handleLikeToggle = (id) => {
    setPosts(posts.map(post =>
      post.id === id ? { 
        ...post, 
        likes: post.liked ? post.likes - 1 : post.likes + 1, 
        liked: !post.liked 
      } : post
    ));
  };

  // 게시물 신고 핸들러
  const handleReportPost = (id) => {
    // 신고 처리 로직을 여기에 추가
    console.log(`게시물 ${id}이 신고되었습니다.`);
    alert('이 게시물은 신고되었습니다.');
  };

  // 게시물 삭제 핸들러
  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  // 현재 페이지에 해당하는 게시물 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Col lg="10" md="12">
      <Card className="bg-light shadow border-0">
        <CardHeader className="bg-primary text-white">
          <h3 className="mb-0">커뮤니티 게시물</h3>
        </CardHeader>

        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center mb-4">
            <h4>우리 커뮤니티에 오신 것을 환영합니다!</h4>
            <p>
              이곳은 주제를 논의하고 질문을 하고 지식을 공유할 수 있는 공간입니다.
              자유롭게 게시물을 작성해 주세요!
            </p>
          </div>

          <Form role="form">
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>게시물</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="게시물을 작성하세요..."
                  type="text"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <div className="text-center">
              <Button color="primary" type="button" onClick={handleAddPost}>
                게시물 작성
              </Button>
            </div>
          </Form>
        </CardBody>

        <CardBody className="px-lg-5 py-lg-5">
          <h5 className="text-muted">최근 게시물:</h5>
          <ListGroup>
            {currentPosts.map(post => (
              <ListGroupItem key={post.id}>
                <div style={styles.postContent}>
                  {post.content}
                </div>
                <div style={styles.postActions}>
                  {/* 좋아요 버튼 */}
                  <span
                    style={post.liked ? styles.likedIcon : styles.likeIcon}
                    onClick={() => handleLikeToggle(post.id)}
                  >
                    ❤️
                  </span>
                  <Badge color="secondary" className="ml-2">
                    {post.likes}
                  </Badge>
                  {/* 신고 버튼 */}
                  <Button
                    color="warning"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleReportPost(post.id)}
                  >
                    신고
                  </Button>
                  {/* 삭제 버튼 */}
                  {post.userId === currentUserId && (
                    <Button
                      color="danger"
                      size="sm"
                      className="ml-2"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      삭제
                    </Button>
                  )}
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>

        {/* 페이지네이션 */}
        {posts.length > postsPerPage && (
          <CardBody className="px-lg-5 py-lg-5">
            <Pagination className="pagination justify-content-center">
              {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(page => (
                <PaginationItem key={page + 1} active={page + 1 === currentPage}>
                  <PaginationLink
                    onClick={() => handlePageChange(page + 1)}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </Pagination>
          </CardBody>
        )}
      </Card>
    </Col>
  );
};

export default CommunityPost;
