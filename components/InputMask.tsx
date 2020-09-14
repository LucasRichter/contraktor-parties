import InputMask from "react-input-mask";
import { Input } from "formik-antd";

const MyInputMask = props => (
  <InputMask
    {...props}
    alwaysShowMask
  >
    {inputProps => <Input {...inputProps} />}
  </InputMask>
);
export default MyInputMask
