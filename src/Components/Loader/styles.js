import styled from 'styled-components'

export const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
export const LoaderBox = styled.div`
    display: block;
    width: ${props => props.size ? props.size : "40px"};
    height: ${props => props.size ? props.size : "40px"};;
    border: 3px solid #ccc;
    border-top-color: #22e;
    border-radius: 50%;
    animation: loading 0.5s linear infinite;

    @keyframes loading {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;