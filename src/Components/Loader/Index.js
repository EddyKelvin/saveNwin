import { LoaderBox, LoaderWrapper } from "./styles";

const Loader = ({size}) => {
    return (
    <LoaderWrapper>
        <LoaderBox size={size} />
    </LoaderWrapper>
    );
}
 
export default Loader;