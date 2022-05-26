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
            flex-direction: column;
            align-items: center;
            margin-top: 20px;

            span {
                display: block;
                font-size: 14px;
                font-weight: 400;
                color: #222;

                :first-child {
                    margin-bottom: 40px;
                    font-weight: 600;
                }
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

export const NotificationTab = styled.ul`
    display: flex;
    padding: 0px;
    margin: 30px 0px 40px 0px;
    border-bottom: 1px solid #ccc;
    li {
        display: flex;
        list-style: none;
        height: 40px;
        position: relative;
        color: #5d5b5b;
        font-size: 15px;
        cursor: pointer;

        :first-child {
            margin-right: 40px;
        }
        ::after {
            content: "";
            display: block;
            position: absolute;
            left: 0px;
            bottom: -2px;
            height: 3px;
            width: 100%;
            background-color: transparent;
        }
    }
    li.active {
        color: #ff0000;
        ::after {
            background-color: #ff0000;
        }
    }
`;