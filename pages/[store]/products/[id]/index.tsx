import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import api from "../../../../api/api";
import styled from "styled-components";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { AuthContext } from "../../../../contexts/AuthContext";
import { StoreContext } from "../../../../components/Layout";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [descriptionFormated, setDescriptionFormated] = useState("");
  const { userClient } = useContext(AuthContext);
  const store = useContext(StoreContext);
  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        const { data: product } = await api.get("/products/" + id);
        const fullTextFormatted = product.description.replace(/.+/g, "<p class='rslines'>$&</p>");
        setDescriptionFormated(fullTextFormatted);
        setProduct(product);
      };
      getProduct();
    }
  }, [id]);

  const addProductToCart = async () => {
    if (userClient && store) {
      try {
        if(userClient?.Orders?.find(order => order.finished === false)) {
          await api.put(`/order/addProduct`, {
            productId: product.id,
            orderId: userClient.Orders.find(order => order.finished === false).id,
          });

          router.push(`/${store?.name}/cart`);
        } else {
          await api.post("/order", {
            productId: product.id,
            clientId: userClient.id,
            value: product.price,
          });
  
          router.push(`/${store?.name}/cart`);
        }
       
      } catch (error) {
        console.log(error);
      }
    } else {
      router.push(`/${store?.name}/loginUser`);
    }
  }

  return (
    <div>
      {product && (
        <Content>
          {product.Upload.length > 0 && (
            <Illustration>
              <DestaqueImage>
                <Image
                  height={400}
                  width={400}
                  layout="intrinsic"
                  src={product.Upload[currentImage]?.url}
                  alt="imagem do produto"
                />
              </DestaqueImage>
              {/* div para escolher outras imagens */}
              <>
                <ButtonChangeImage>
                  <button
                    onClick={() => {
                      setCurrentImage(
                        currentImage - 1 >= 0
                          ? currentImage - 1
                          : product.Upload.length - 1
                      );
                    }}
                  >
                    <IconeChangeImage>
                      {" "}
                      <MdArrowBack size={30} color="#000" />
                    </IconeChangeImage>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentImage(
                        currentImage + 1 === product.Upload.length
                          ? 0
                          : currentImage + 1
                      );
                    }}
                  >
                    <IconeChangeImage>
                      <MdArrowForward size={30} color="#000" />
                    </IconeChangeImage>
                  </button>
                </ButtonChangeImage>
                <OtherImages>
                  {product.Upload.map((image, index) => (

                    currentImage === index ? (
                        <OtherImageCurrent>
                            <Image
                                height={150}
                                width={150}
                                src={image.url}
                                alt="imagem do produto"
                                onClick={() => {
                                    setCurrentImage(index);
                                }}
                            />
                        </OtherImageCurrent>
                    ) : (
                        <OtherImage>
                            <Image
                            height={150}
                            width={150}
                            src={image.url}
                            alt="imagem do produto"
                            onClick={() => {
                                setCurrentImage(index);
                            }}
                            />
                      </OtherImage>
                    )
                  ))}
                </OtherImages>
              </>
            </Illustration>
          )}
          <Description>
            <h2>{product.name}</h2>
            <div id="bodyText">
              <div dangerouslySetInnerHTML={{ __html: descriptionFormated }} />
            </div>
            { product.price && (
               <Price>
                <h3>R$ {product.price}</h3>
               </Price>
            ) }
            {
              store?.typeOfStore === "saleOfProducts" ? (
                <ButtonAddToCart>
                  <button
                    onClick={addProductToCart}
                  >
                    Adicionar ao carrinho
                  </button>
                </ButtonAddToCart>
              ) : (
                <ConsultPrice
                onClick={(e) => {
                  e.preventDefault();
                  //consultarPreco(produto);
                }}
              >
                Colsultar preço
              </ConsultPrice>
              )
            }
          </Description>
        </Content>
      )}
    </div>
  );
}

/* styled components */
const Content = styled.div`
  padding: 2rem 0;
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Illustration = styled.div`
  flex: 2;
  justify-content: center;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    flex: 1;
  }
`;
const DestaqueImage = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    height: 300px;
    max-width: 300px;
    margin: 0 auto;

    img {
      height: 300px;
      max-width: 300px;
    }
  }
`;
const OtherImages = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  img {
    width: 150px;
    height: 150px;
    margin-right: 1rem;
    margin-bottom: 0.2rem;
    :last-child {
      margin-right: 0;
    }
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .activeImage {
    border: 3px solid var(--secondary-color);
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    .otherImage {
      width: 100px;
      height: 100px;
      margin-bottom: 0;
    }
    img {
      width: 100px;
      height: 100px;
      margin-bottom: 0;
    }
  }
`;
const ButtonChangeImage = styled.div`
  z-index: 1;
  position: absolute;
  right: 50px;
  :first-child {
    margin-right: 0.6rem;
  }
  button {
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    .iconeChangeImage {
    }
  }

  @media (max-width: 768px) {
    right: 0;
  }
`;
const Description = styled.div`
  flex: 1;
  margin-top: 2rem;
  padding: 0 1rem;
  h2 {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
  #bodyText {
    font-size: 1rem;
    line-height: 1rem;
  }

  .consultPrice {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ConsultPrice = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const Loader = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IconeChangeImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 0.3rem;
  svg {
    margin: 0;
  }
`;
const OtherImage = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 0;

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    margin-bottom: 0;
  }
`;

const OtherImageCurrent = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 0;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  img {
    width: 100px;
    height: 100px;
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    margin-bottom: 0;
  }
`;

const Price = styled.div`
  margin-top: 1rem;
  h3 {
    font-size: 1.3rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ButtonAddToCart = styled.div`
  margin-top: 1rem;
  button {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;


