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
import addProduct from 'apis/product/addProduct';
import { useNavigate } from 'react-router-dom';
import Header from 'components/Headers/Header';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState('');
  const [alertQuantity, setAlertQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [message, setMessage] = useState('');
  const categories = ['생필품', '전자제품', '식료품', '가전제품', '선택 안함']; // 옵션 목록

  const navigate = useNavigate();

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

    addProduct(data,
      (response) => {
        setMessage(response.data.message);
        setProductName('');
        setCurrentQuantity('');
        setAlertQuantity('');
        setCategory('');
        setPurchaseDate('');

        navigate('/product/dashboard');
      },
      (error) => {
        setMessage('상품 추가에 실패했습니다.');
      }
    );
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
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
                      <option value="" disabled selected>카테고리를 선택하세요</option>
                      {categories.map((cate, idx)=>(
                        <option key={idx} value={cate}>{cate}</option>
                      ))}
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
