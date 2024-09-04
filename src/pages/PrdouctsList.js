import { useState } from "react";
import { Button, Card, CardHeader, CardBody, Table, Container, Row, Col, Input } from "reactstrap";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import Header from "components/Headers/Header.js";

// 'Index'라는 이름의 React 컴포넌트를 정의합니다.
const Index = (props) => {
  // 편집 모드와 생필품 목록의 상태를 관리합니다.
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: "화장지", quantity: 20, alerts: 2, lastPurchase: "2024-09-01", category: "위생" },
    { id: 2, name: "손 세정제", quantity: 15, alerts: 1, lastPurchase: "2024-08-25", category: "위생" },
    { id: 3, name: "샴푸", quantity: 10, alerts: 0, lastPurchase: "2024-07-10", category: "헤어케어" },
  ]);

  // 편집 모드를 토글하는 함수입니다.
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  // 컴포넌트의 반환 부분입니다.
  return (
    <>
      <Header />
      {/* 페이지 콘텐츠를 감싸는 컨테이너입니다. */}
      <Container className="mt--7" fluid>
        <Row>
          <Col md="12">
            {/* 검색 및 마이페이지 버튼 */}
            <Row className="mb-4">
              <Col md="8">
                <Input type="text" placeholder="아이템을 검색하세요..." />
              </Col>
              <Col md="4" className="text-right">
                <Button color="primary" href="#mypage">
                  마이 페이지
                </Button>
              </Col>
            </Row>

            {/* 생필품 목록 표 */}
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">필수 물품 목록</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" size="sm" onClick={toggleEditing}>
                      {isEditing ? "저장" : "편집"}
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">번호</th>
                      <th scope="col">상품명</th>
                      <th scope="col">재고 개수</th>
                      <th scope="col">알림 개수</th>
                      <th scope="col">마지막 구매일</th>
                      <th scope="col">카테고리</th>
                      <th scope="col">상태</th> {/* 추가된 열 */}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
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
                        <td>{item.alerts}</td>
                        <td>{item.lastPurchase}</td>
                        <td>{item.category}</td>
                        <td>
                          {/* 아이콘을 이용하여 재고 상태 표시 */}
                          {item.quantity < 5 ? (
                            <FaExclamationCircle color="red" />
                          ) : (
                            <FaCheckCircle color="green" />
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
      </Container>
    </>
  );
};

export default Index;
