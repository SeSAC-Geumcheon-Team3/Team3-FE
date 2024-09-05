import React, { useState } from "react";
import { Button, Card, CardHeader, CardBody, Table, Container, Row, Col, Input, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { FaExclamationCircle, FaCheckCircle, FaEdit, FaPlus, FaSearch } from "react-icons/fa";
import Header from "components/Headers/Header.js";
import "./ProductList.css";

const categories = ["식료품 및 음료", "주방 및 조리 용품", "위생 및 청결 용품", "의류 및 세탁 용품", "가구 및 가정용품",
    "건강 및 응급 용품", "개인 관리 용품", "유아 및 육아용품", "반려동물 용품", "일회용품 및 소비재", "전기/전자 기기 및 액세서리"];


const ProductList = (props) => {
  const [hideCards, setHideCards] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: "휴지", quantity: 20, alerts: 2, lastPurchase: "2024-09-01", category: "위생" },
    { id: 2, name: "핸드 솝", quantity: 15, alerts: 1, lastPurchase: "2024-08-25", category: "위생" },
    { id: 3, name: "샴푸", quantity: 10, alerts: 0, lastPurchase: "2024-07-10", category: "헤어케어" },
  ]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("모든 카테고리");

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSearch = () => {
    // 검색 기능 구현
    console.log("Search for:", searchText, "in category:", selectedCategory);
  };

  const filteredItems = items.filter(item =>
    (selectedCategory === "모든 카테고리" || item.category === selectedCategory) &&
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Header hideCards={hideCards} />
      <Container className="mt--7" fluid>
        <Row>
          <Col md="12">
            <Row className="mb-4">
              <Col md="4">
                <Button color="secondary" block size="sm" className="dropdown-toggle">
                  {selectedCategory}
                </Button>
                <div className="dropdown-menu">
                  {categories.map(category => (
                    <Button
                      key={category}
                      className="dropdown-item"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  placeholder="아이템 검색..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </Col>
              <Col md="2" className="text-right">
                <Button
                  color="primary"
                  size="sm"
                  onClick={handleSearch}
                >
                  <FaSearch size={16} />
                </Button>
              </Col>
            </Row>

            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    {/* '필수 물품 목록' 텍스트 삭제 */}
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">번호</th>
                      <th scope="col">상품명</th>
                      <th scope="col">보유 수량</th>
                      <th scope="col">알림 수량</th>
                      <th scope="col">마지막 구매일</th>
                      <th scope="col">카테고리</th>
                      <th scope="col">알림</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          {isEditing ? (
                            <Input
                              type="text"
                              defaultValue={item.name}
                              onChange={(e) =>
                                setItems(
                                  items.map((i) =>
                                    i.id === item.id
                                      ? { ...i, name: e.target.value }
                                      : i
                                  )
                                )
                              }
                            />
                          ) : (
                            item.name
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <Input
                              type="number"
                              defaultValue={item.quantity}
                              onChange={(e) =>
                                setItems(
                                  items.map((i) =>
                                    i.id === item.id
                                      ? { ...i, quantity: e.target.value }
                                      : i
                                  )
                                )
                              }
                            />
                          ) : (
                            item.quantity
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <Input
                              type="number"
                              defaultValue={item.alerts}
                              onChange={(e) =>
                                setItems(
                                  items.map((i) =>
                                    i.id === item.id
                                      ? { ...i, alerts: e.target.value }
                                      : i
                                  )
                                )
                              }
                            />
                          ) : (
                            item.alerts
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <Input
                              type="date"
                              defaultValue={item.lastPurchase}
                              onChange={(e) =>
                                setItems(
                                  items.map((i) =>
                                    i.id === item.id
                                      ? { ...i, lastPurchase: e.target.value }
                                      : i
                                  )
                                )
                              }
                            />
                          ) : (
                            item.lastPurchase
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <Input
                              type="text"
                              defaultValue={item.category}
                              onChange={(e) =>
                                setItems(
                                  items.map((i) =>
                                    i.id === item.id
                                      ? { ...i, category: e.target.value }
                                      : i
                                  )
                                )
                              }
                            />
                          ) : (
                            item.category
                          )}
                        </td>
                        <td>
                          {item.alerts > 0 ? (
                            <FaExclamationCircle style={{ color: 'red' }} />
                          ) : (
                            <FaCheckCircle style={{ color: 'green' }} />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md="12" className="text-center">
            <Pagination>
              <PaginationItem disabled>
                <PaginationLink previous href="#pablo" />
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink href="#pablo">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href="#pablo" />
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductList;
