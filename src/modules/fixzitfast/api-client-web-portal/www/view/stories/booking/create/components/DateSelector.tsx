import Dependencies, { Service } from "typedi";

import * as React from "react";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";
import { 
    Fragment,
    Button,
    Header,
    Block, Row, Column, NewLine, Paragraph,
    Badge
} from "../../../../Theme";

import moment from "moment";
import { ScrollingDatePicker } from "./ScrollingDatePicker";
import { TimePricePicker } from "./TimePricePicker";



export namespace DateSelector
{
    export interface IViewProps
    {
        className?: string;
        value: Date;
        onChange?: Function;
    }

    export class Component extends React.PureComponent<IViewProps>
    {
        Day: string;
        Month: string;
        Year: string;

        constructor(props)
        {
            super(props);
            
            let date = new Date();
            date.setHours(8, 0, 0);

            this.Day = moment(date).format('Do');
            this.Month = moment(date).format('MMMM');
            this.Year = moment(date).format('YYYY');
        }

        get hours()
        {
            let time = this.props.value;

            return [
                { time: new Date(time.setHours(8, 0, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(9, 0, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(10, 0, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(11, 0, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(12, 0, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(13, 0, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(14, 0, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(15, 0, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(16, 0, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(17, 0, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(18, 0, 0, 0) ), price: "£100" },
            ];
        }
        
        render() {
            console.warn("render date selector", this.props.value)
            return <Fragment>
                <Paragraph><i className="fas fa-calendar" /> &nbsp; { this.Month }</Paragraph>

                <ScrollingDatePicker.Component value={this.props.value} onChange={date => this.props.onChange(date)} />

                <NewLine />
                <NewLine />

                <TimePricePicker.Component value={this.props.value} hours={this.hours} onChange={date => this.props.onChange(date)} />
            </Fragment>;
        }
    }
}