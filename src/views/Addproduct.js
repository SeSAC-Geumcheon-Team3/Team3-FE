import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';
import styles from './Addproduct.styles.css';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from 'states/accessTokenAtom';
import addProduct from 'apis/product/addProduct';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState('');
  const [alertQuantity, setAlertQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [message, setMessage] = useState('');

  const accessToken = useRecoilValue(accessTokenState);

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      product_name: productName,
      icon: "https://via.placeholder.com/20",
      stock: currentQuantity,
      limit: alertQuantity,
      category: category,
      update_date: purchaseDate,
    };

    addProduct(data, accessToken,
      (response) => {
        setMessage(response.data.message);
        setProductName('');
        setCurrentQuantity('');
        setAlertQuantity('');
        setCategory('');
        setPurchaseDate('');
      },
      (error) => {
        setMessage('상품 추가에 실패했습니다.');
      }
    );
  };

  return (
    <>
      <h2 className={styles.title}>생필품 추가</h2>

      <Container fluid className={styles.container}>
        <Row className="justify-content-center">
          <Col lg="12" md="6">
            <Card className="shadow">
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <label className={styles.label} htmlFor="productName">품목</label>
                    <Input
                      id="productName"
                      placeholder="품목을 입력하세요"
                      type="text"
                      value={productName}
                      onChange={handleInputChange(setProductName)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className={styles.label} htmlFor="currentQuantity">보유 수량</label>
                    <Input
                      id="currentQuantity"
                      placeholder="보유 수량을 입력하세요"
                      type="number"
                      value={currentQuantity}
                      onChange={handleInputChange(setCurrentQuantity)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className={styles.label} htmlFor="alertQuantity">알림 수량</label>
                    <Input
                      id="alertQuantity"
                      placeholder="알림 수량을 입력하세요"
                      type="number"
                      value={alertQuantity}
                      onChange={handleInputChange(setAlertQuantity)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className={styles.label} htmlFor="category">카테고리</label>
                    <Input
                      id="category"
                      type="select"
                      value={category}
                      onChange={handleInputChange(setCategory)}
                    >
                      <option value="식료품 및 음료">식료품 및 음료</option>
                      <option value="주방 및 조리 용품">주방 및 조리 용품</option>
                      <option value="의류 및 세탁 용품">의류 및 세탁 용품</option>
                      <option value="위생 및 청결 용품">위생 및 청결 용품</option>
                      <option value="가구 및 가정용품">가구 및 가정용품</option>
                      <option value="건강 및 응급 용품">건강 및 응급 용품</option>
                      <option value="개인 관리 용품">개인 관리 용품</option>
                      <option value="유아 및 육아용품">유아 및 육아용품</option>
                      <option value="반려동물 용품">반려동물 용품</option>
                      <option value="일회용품 및 소비재">일회용품 및 소비재</option>
                      <option value="전기/전자 기기 및 액세서리">전기/전자 기기 및 액세서리</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <label className={styles.label} htmlFor="purchaseDate">구매일</label>
                    <Input
                      id="purchaseDate"
                      placeholder="구매일을 입력하세요"
                      type="date"
                      value={purchaseDate}
                      onChange={handleInputChange(setPurchaseDate)}
                    />
                  </FormGroup>
                  <Button color="primary" className={styles.submitBtn} type="submit">추가하기</Button>
                  {message && <p className="mt-3">{message}</p>}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddProduct;
