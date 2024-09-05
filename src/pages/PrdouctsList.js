import React, { useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody, Table, Container, Row, Col, Input,  UncontrolledTooltip, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { FaEdit, FaPlusCircle, FaSave } from "react-icons/fa";
import Header from "components/Headers/Header.js";
import "./ProductList.css";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "states/accessTokenAtom";
import getProductList from "apis/product/getProductList";
import { useNavigate } from "react-router-dom";
import putProductList from "apis/product/putProductList";

const ProductList = (props) => {

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [products, setProducts] = useState([]);                 // 물품 정보 저장
  const [totalProductsCnt, setTotalProductsCnt] = useState(0);  // 물품 전체 개수 저장
  const [filteredProducts, setFilteredProducts] = useState([]); // 화면에 보일 물품 정보
  const accessToken = useRecoilValue(accessTokenState);

  const [searchText, setSearchText] = useState('');             // 검색어
  const [selectedCategory, setSelectedCategory] = useState(''); // 카테고리 선택자
  const categories = ['생필품', '전자제품', '식료품', '가전제품', '선택 안함']; // 옵션 목록

  /** 검색 조건에 맞추어 생필품 리턴 */
  const filtering = (category,search) => {
    if (category==='선택 안함'){
      const filtered = products.filter((prod) => prod.product.includes(search));
      setFilteredProducts(filtered)
    }
    else{
      const filtered = products.filter((prod) => prod.product.includes(search) && prod.category===category);
      setFilteredProducts(filtered)
    }
  }

  /** 카테고리 select 태그 선택 시 화면에 보이는 productlist 수정 */
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    filtering(e.target.value,searchText);
  }

  /** 검색어 입력 이벤트 발생 시 생필품 목록 필터링*/
  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
    filtering(selectedCategory,e.target.value);
  };


  /** 편집 시 products 상태 업데이트 */ 
  const handleChangeInput = (index) => (e) => {

    const { name, value } = e.target; // name 속성으로 필드 구분

    // 숫자로 처리해야 하는 필드 이름 목록
    const numberFields = ['stock', 'limit'];

    // products 배열의 복사본을 생성하여 수정
    const updatedProducts = [...products];

    updatedProducts[index][name] = numberFields.includes(name) ? Number(value) : value; // 해당 인덱스의 필드 값 변경

    if (Array.isArray(updatedProducts))
      setProducts(updatedProducts); // 상태 업데이트
  };

  
  /** 변경사항 저장 버튼 클릭 */
  const onClickSaveBtn = () => {
    const data = products.map(({idx,category,stock,limit})=>({idx,category,stock,limit}))
    putProductList(accessToken, {"data":data}).then(res=>{
      getProductList(accessToken).then(res=>setProducts(res.data.items))
      setIsEditing(false);
    })
  }

  // product 데이터 받아오기
  const fetchData = async() => {
    return await getProductList(accessToken)
  }

  useEffect(()=>{
    fetchData().then(res=>{
      setProducts(res.data.items)
      setTotalProductsCnt(res.data.totalItems)
      setFilteredProducts(res.data.items)
    }).catch(err=>console.log(err))
  },[])

  return (
    <>
      <Header/>
      <Container className="mt--7" fluid>
        <Row>
          <Col md="12">
            <Row className="mb-4" style={{paddingRight:'10px'}}>

              {/* 수정 버튼 */}
              <Col className="text-right">
                <Button
                  color="primary"
                  size="sm"
                  id="prod-list-edit-btn"
                  onClick={()=>setIsEditing(!isEditing)}
                  hidden={isEditing}
                >
                  <FaEdit size={16} />
                </Button>
                <UncontrolledTooltip
                  placement="top"
                  target="prod-list-edit-btn"
                  hidden={isEditing}
                >
                  생필품 수정
                </UncontrolledTooltip>

                {/* 변경사항 저장 버튼 */}
                <Button
                  color="secondary"
                  size="sm"
                  id="prod-list-save-btn"
                  hidden={!isEditing}
                  onClick={onClickSaveBtn}
                >
                  <FaSave size={16} />
                </Button>
                <UncontrolledTooltip
                  placement="top"
                  target="prod-list-save-btn"
                  hidden={!isEditing}
                >
                  변경사항 저장
                </UncontrolledTooltip>

                {/* 생필품 추가 버튼 */}
                <Button
                  color="primary"
                  size="sm"
                  onClick={()=>navigate('/admin/add-product')}
                  id='add-prod-btn'
                >
                  <FaPlusCircle size={16} />
                </Button>
                <UncontrolledTooltip
                  delay={0}
                  placement="top"
                  target="add-prod-btn"
                >
                  생필품 추가
                </UncontrolledTooltip>
              </Col>
            </Row>

            <Card className="shadow">
              
              {/* product list board의 헤더 */}
              <CardHeader className="border-0" style={{paddingBottom:'0'}}>

                <Row class="row_product_search" style={{justifyContent:'space-between',paddingBottom:'0 !important'}} >

                  {/* 카테고리 select */}
                  <select value={selectedCategory} onChange={handleCategoryChange} class="category_select">
                    <option value="" disabled selected>카테고리를 선택하세요</option>
                    {categories.map((cate, idx)=>(
                      <option key={idx} value={cate}>{cate}</option>
                    ))}
                  </select>

                  {/* 검색창 */}
                  <Col lg='4'>
                      <InputGroup className="input-group-alternative mb-4">
                        <Input placeholder="생필품을 검색하세요" type="text" value={searchText} onChange={handleSearchInput} />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <i className="ni ni-zoom-split-in" />
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                  </Col>
                </Row>
                
                <Row className="align-items-center">
                  <div className="col">
                    {/* '필수 물품 목록' 텍스트 삭제 */}
                  </div>
                </Row>
              </CardHeader>

              {/* product 테이블 */}
              <CardBody style={{paddingTop:'0'}}>
                <Table className="align-items-center table-flush" responsive>
                  {/* 테이블 헤더 */}
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"><big>카테고리</big></th>
                      <th scope="col"><big>상품명</big></th>
                      <th scope="col"><big>보유 수량</big></th>
                      <th scope="col"><big>알림 수량</big></th>
                      <th scope="col"><big>마지막 구매일</big></th>
                    </tr>
                  </thead>

                  {/* 테이블 본문 */}
                  <tbody>
                    {filteredProducts.map((product, idx) => (
                      <tr>
                        {/* 카테고리 */}
                        <td>
                          <Input
                            type="text"
                            value={product.category}
                            name="category"
                            onChange={handleChangeInput(idx)}
                            disabled={!isEditing}
                            className={!isEditing ? 'input-disabled' : ''}
                          />
                        </td>

                        {/* 상품명 */}
                        <td>
                          <Input
                            type="text"
                            value={product.product}
                            name="product_name"
                            onChange={handleChangeInput(idx)}
                            disabled={!isEditing}
                            className={!isEditing ? 'input-disabled' : ''}
                          />
                        </td>

                        {/* 보유수량 */}
                        <td>
                          <Input
                            type="number"
                            defaultValue={product.stock}
                            name="stock"
                            onChange={handleChangeInput(idx)}
                            disabled={!isEditing}
                            className={!isEditing ? 'input-disabled' : ''}
                          />
                        </td>

                        {/* 알림 수량 */}
                        <td>
                          <Input
                            type="number"
                            defaultValue={product.limit}
                            name="limit"
                            onChange={handleChangeInput(idx)}
                            disabled={!isEditing}
                            className={!isEditing ? 'input-disabled' : ''}
                          />
                        </td>

                        {/* 마지막 구매일 */}
                        <td>
                          <Input
                            type="date"
                            defaultValue={product.update_date}
                            name="update_date"
                            onChange={handleChangeInput(idx)}
                            disabled={!isEditing}
                            className={!isEditing ? 'input-disabled' : ''}
                          />
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

export default ProductList;
