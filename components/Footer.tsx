import styled from "styled-components";

export default function Footer() {
    return (
        <FooterStyled>
        <p>&copy; 2022</p>
        </FooterStyled>
    );
}

// create style for footer
const FooterStyled = styled.footer`
    display: none;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
    p {
        font-size: 1.2rem;
    }
    width: 100%;
`;
