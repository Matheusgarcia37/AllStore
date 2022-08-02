import Link from 'next/link';
import styled from 'styled-components';
export default function Header() {
    return (
        <HeaderStyled>
        <h1>
            <Link href="/">
            <a>
                <img src="/logo.svg" alt="logo" />
            </a>
            </Link>
        </h1>
        <nav>
            <ul>
            <li>
                <Link href="/">
                <a>Home</a>
                </Link>
            </li>
            <li>
                <Link href="/about">
                <a>About</a>
                </Link>
            </li>
            <li>
                <Link href="/contact">
                <a>Contact</a>
                </Link>
            </li>
            </ul>
        </nav>
        </HeaderStyled>
    )
}

// create style for header
const HeaderStyled = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    h1 {
        font-size: 1.5rem;
        a {
            color: ${({ theme }) => theme.colors.text};
            text-decoration: none;
            &:hover {
                color: ${({ theme }) => theme.colors.text};
            }
        }
    }
    nav {
        ul {
            display: flex;
            align-items: center;
            justify-content: space-between;
            li {
                margin-left: 20px;
                a {
                    color: ${({ theme }) => theme.colors.text};
                    text-decoration: none;
                    &:hover {
                        color: ${({ theme }) => theme.colors.text};
                    }
                }
            }
        }
    }
`;
