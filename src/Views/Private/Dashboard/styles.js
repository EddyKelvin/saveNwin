import styled from 'styled-components';

export const ModalWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0006;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    padding: 20px;
    cursor: pointer;
    z-index: 999999;
`;

export const Modal = styled.div`
    padding: 40px 20px;
    background-color: #fff;
    border-radius: 10px;
    width: 100%;
    max-width: 480px;
    cursor: initial;

    .profile-overview {
        display: flex;
        flex-direction: column;
        align-items: center;

        .img-wrapper {
            width: 80px;
            height: 80px;
            overflow: hidden;
            border-radius: 50%;
            background-color: #ccc;

            img {
                width: 100%;
                min-height: 80px;
            }
        }

        .user-info {
            display: flex;
            margin-top: 20px;

            span {
                font-size: 14px;
                font-weight: 500;
                color: #222;
            }
        }
    }

    ul {
        li {
            list-style: none;
            margin-top: 10px;
            display: flex;
            justify-content: space-between;

            span {
                font-size: 14px;
                font-weight: 300;
                :first-child {
                    font-weight: 500;
                }
            }
        }
    }
`;