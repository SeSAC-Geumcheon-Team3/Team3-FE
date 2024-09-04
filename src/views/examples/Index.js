import { useState } from "react";
import classnames from "classnames";
import { Button, Card, CardHeader, CardBody, Nav, NavItem, NavLink, Table, Container, Row, Col, Input} from "reactstrap";
import Header from "components/Headers/Header.js";

const Index = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: "Toilet Paper", quantity: 20, price: "$5.00" },
    { id: 2, name: "Hand Soap", quantity: 15, price: "$3.50" },
    { id: 3, name: "Shampoo", quantity: 10, price: "$6.00" },
  ]);

  // 편집 모드 토글
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          {/* 좌측 메뉴바 */}
          <Col md="2">
            <Nav vertical pills>
              <NavItem>
                <NavLink href="#">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Products</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Categories</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Orders</NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="10">
            {/* 검색 및 마이페이지 버튼 */}
            <Row className="mb-4">
              <Col md="8">
                <Input type="text" placeholder="Search for items..." />
              </Col>
              <Col md="4" className="text-right">
                <Button color="primary" href="#mypage">
                  My Page
                </Button>
              </Col>
            </Row>

            {/* 생필품 목록 표 */}
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Essential Goods List</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" size="sm" onClick={toggleEditing}>
                      {isEditing ? "Save" : "Edit"}
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Item Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
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
                        <td>{item.price}</td>
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