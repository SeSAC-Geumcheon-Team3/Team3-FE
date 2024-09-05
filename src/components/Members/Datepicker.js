import React from "react";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";

// reactstrap components
import {
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row
} from "reactstrap";

class Datepicker extends React.Component {
    
    render() {
        const { selectedDate, onDateChange } = this.props; // props로 전달된 상태와 함수를 받습니다.

        return (
            <>
                <FormGroup>
                <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                    </InputGroupAddon>
                    <ReactDatetime
                    inputProps={{
                        placeholder: "Date Picker Here"
                    }}
                    timeFormat={false}
                    />
                </InputGroup>
                </FormGroup>
            </>
        );
    }
}

export default Datepicker;