import styled from "styled-components";

export const ContainerIndex = styled.div`
    margin-top: 1rem;
    width: 100%;
    h1 {
        font-size: 2.4rem;
        font-weight: bold;
        margin-bottom: 2rem;
        color: ${({ theme }) => theme.colors.primary};
        //text-shadow: 1px 1px 1px ${({ theme }) => theme.colors.secondary};
    }
`;

export const FeaturedProducts = styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
    h2 {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 20px;
        color: ${({ theme }) => theme.colors.secondary};
    }
    ul {
        margin-left: 0;
        padding-left: 0;
        display: grid;
        justify-items: center;
        gap: 5rem;
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
        li {
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            //padding: 1rem;
            cursor: pointer;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
            img {
                width: 200px;
                height: 250px;
                object-fit: cover;
            }
            strong {
                font-size: 1.2rem;
                font-weight: bold;
            }
            p {
                font-size: 1rem;
                margin-top: 5px;
            }

            :hover {
                //sombra mais forte
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
            }
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        ul {
           // grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
            gap: 2rem 1rem;

            li {
                img {
                    width: 150px;
                    height: 200px;
                }

                strong {
                    font-size: 1rem;
                }
                p {
                    font-size: 0.8rem;

                }


            }


        }
    }
`;