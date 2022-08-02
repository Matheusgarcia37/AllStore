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
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    p {
        font-size: 1.5rem;
    }
    position: absolute;
    bottom: 0;
    width: 100%;
`;
