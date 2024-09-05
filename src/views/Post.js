import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Col,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup
} from 'reactstrap';

const currentUserId = 1;

const CommunityPost = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingPost, setEditingPost] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [editedImage, setEditedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
    setTotalPages(Math.ceil(storedPosts.length / 25));
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleAddPost = () => {
    if (newPost.trim() || newImage) {
      const newPostData = {
        board_idx: Date.now(),
        member_idx: currentUserId,
        nickname: '내닉네임',
        content: newPost,
        like: 0,
        created_at: new Date().toISOString().split('T')[0],
        image_paths: newImage ? [URL.createObjectURL(newImage)] : [],
      };

      setPosts([newPostData, ...posts]);
      setNewPost('');
      setNewImage(null);
      setTotalPages(Math.ceil(posts.length / 25));
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setEditedContent(post.content);
    if (post.image_paths.length > 0) {
      setEditedImage(post.image_paths[0]);
    }
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    if (editedContent.trim() || editedImage) {
      setPosts(
        posts.map((post) =>
          post.board_idx === editingPost.board_idx
            ? { 
                ...post, 
                content: editedContent, 
                image_paths: editedImage ? [editedImage] : []
              }
            : post
        )
      );
      setEditingPost(null);
      setEditedContent('');
      setEditedImage(null);
      setShowModal(false);
    } else {
      alert('내용을 입력해 주세요!');
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditedContent('');
    setEditedImage(null);
    setShowModal(false);
  };

  const handleLikeToggle = (id) => {
    setPosts(
      posts.map((post) =>
        post.board_idx === id
          ? { ...post, like: post.like % 2 === 0 ? post.like + 1 : post.like - 1 }
          : post
      )
    );
  };

  const handleDeletePost = (id) => {
    const confirmDelete = window.confirm('정말로 이 게시물을 삭제하시겠습니까?');
    if (confirmDelete) {
      setPosts(posts.filter((post) => post.board_idx !== id));
      const newTotalPages = Math.ceil((posts.length - 1) / 25);
      setTotalPages(newTotalPages);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleEditImageChange = (e) => {
    setEditedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleRemoveImage = () => {
    setEditedImage(null);
  };

  const handleReportPost = (id) => {
    alert('이 게시물이 신고되었습니다.');
    // 신고 처리를 위한 추가 로직을 여기에 작성할 수 있습니다.
  };

  const getCurrentPagePosts = () => {
    const startIndex = (currentPage - 1) * 25;
    const endIndex = startIndex + 25;
    return posts.slice(startIndex, endIndex);
  };

  return (
    <Col lg="8" md="10" className="mx-auto">
      <Card className="shadow border-0">
        <CardHeader className="bg-primary text-white">
          <h3 className="mb-0">커뮤니티 게시물</h3>
        </CardHeader>

        <CardBody className="px-4 py-4">
          <div className="text-center mb-4">
            <h1>새싹이들의 대화</h1>
            <p>새싹이들의 생필품 관련 꿀팁을 소개해 주세요!</p>
          </div>

          <Form>
            <FormGroup>
              <InputGroup className="mb-3">
                <Input
                  placeholder="게시물을 작성하세요..."
                  type="text"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Input
                type="file"
                onChange={handleImageChange}
              />
              {newImage && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(newImage)}
                    alt="미리보기"
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </FormGroup>
            <div className="text-center">
              <Button color="primary" onClick={handleAddPost}>
                게시물 작성
              </Button>
            </div>
          </Form>
        </CardBody>

        <CardBody className="px-4 py-4">
          {getCurrentPagePosts().map((post) => (
            <div key={post.board_idx} className="mb-4">
              <Card className="shadow-sm">
                <CardBody>
                  <div className="d-flex align-items-center mb-2">
                    <h5 className="card-title mb-0">{post.nickname}</h5>
                    <span className="ml-auto text-muted">{post.created_at}</span>
                  </div>
                  {post.image_paths.length > 0 && (
                    <img
                      src={post.image_paths[0]}
                      alt="게시물 이미지"
                      style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  )}
                  <p className="card-text mt-2">{post.content}</p>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="d-flex align-items-center">
                      <span
                        style={{ cursor: 'pointer', color: 'gray' }}
                        onClick={() => handleLikeToggle(post.board_idx)}
                      >
                        ❤️
                      </span>
                      <Badge color="secondary" className="ml-2">
                        {post.like}
                      </Badge>
                    </div>
                    {post.member_idx === currentUserId && (
                      <div className="d-flex">
                        <Button
                          color="warning"
                          size="sm"
                          className="mr-2"
                          onClick={() => handleEditPost(post)}
                        >
                          수정
                        </Button>
                        <Button
                          color="danger"
                          size="sm"
                          className="mr-2"
                          onClick={() => handleDeletePost(post.board_idx)}
                        >
                          삭제
                        </Button>
                        <Button
                          color="info"
                          size="sm"
                          onClick={() => handleReportPost(post.board_idx)}
                        >
                          신고
                        </Button>
                      </div>
                    )}
                    {post.member_idx !== currentUserId && (
                      <Button
                        color="info"
                        size="sm"
                        onClick={() => handleReportPost(post.board_idx)}
                      >
                        신고
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </CardBody>

        {totalPages > 1 && (
          <Pagination
            aria-label="Page navigation example"
            className="pagination justify-content-center mb-4"
          >
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink
                onClick={() => setCurrentPage(currentPage - 1)}
                previous
              />
            </PaginationItem>
            {[...Array(totalPages).keys()].map((page) => (
              <PaginationItem
                key={page + 1}
                active={page + 1 === currentPage}
              >
                <PaginationLink onClick={() => setCurrentPage(page + 1)}>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={currentPage === totalPages}>
              <PaginationLink
                onClick={() => setCurrentPage(currentPage + 1)}
                next
              />
            </PaginationItem>
          </Pagination>
        )}
      </Card>

      <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
        <ModalHeader toggle={() => setShowModal(false)}>게시물 수정</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                type="text"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder="게시물 내용"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="file"
                onChange={handleEditImageChange}
              />
              {editedImage && (
                <div className="mt-2">
                  <img
                    src={editedImage}
                    alt="미리보기"
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                  />
                  <Button
                    color="danger"
                    size="sm"
                    className="mt-2"
                    onClick={handleRemoveImage}
                  >
                    이미지 삭제
                  </Button>
                </div>
              )}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveEdit}>
            저장
          </Button>
          <Button color="secondary" onClick={handleCancelEdit}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </Col>
  );
};

export default CommunityPost;
