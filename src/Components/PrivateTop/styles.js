import styled from 'styled-components'

export const NotifyWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    margin-right: 20px;
    position: relative;
    cursor: pointer;

    span {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #900;
        color: #fff;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 2px solid #fff;
        position: absolute;
        top: -10px;
        left: -10px;
        font-size: 9px;
    }

    .motes {
        display: block;
        width: 320px;
        background-color: #fff;
        border-radius: 3px;
        max-height: 200px;
        overflow-y: auto;
        box-shadow: 0px 0px 20px -5px #ccc;
        position: absolute;
        top: 0px;
        right: 0px;
        z-index: 999999;

        li {
            display: block;
            list-style: none;
            padding: 10px;
            color: #5d5b5b;
            border-bottom: 1px solid #ececec;
            cursor: pointer;

            :last-child {
                border-bottom: none;
            }
        }
    }
`;
export const LeftRow = styled.div`
    display: flex;
    align-items: center;
`;