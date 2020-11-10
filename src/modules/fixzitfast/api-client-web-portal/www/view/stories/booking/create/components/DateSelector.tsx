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

    export class Component extends React.Component<IViewProps>
    {
        Day: string;
        Month: string;
        Year: string;

        constructor(props)
        {
            super(props);
            
            this.Day = moment(this.props.value).format('Do');
            this.Month = moment(this.props.value).format('MMMM');
            this.Year = moment(this.props.value).format('YYYY');
        }

        componentDidUpdate()
        {
            this.Day = moment(this.props.value).format('Do');
            this.Month = moment(this.props.value).format('MMMM');
            this.Year = moment(this.props.value).format('YYYY');
        }

        createTime(date: Date, hour: number, price: string)
        {
            let time = {
                time: new Date((new Date()).setHours(hour, 0, 0, 0)),
                price: price,
                selected: false
            };

            time.selected = (time.time.getHours() == this.props.value.getHours());

            return time;
        }

        hours()
        {
            let time = this.props.value;

            return [
                this.createTime(time, 7, "£100"),
                this.createTime(time, 8, "£100"),
                this.createTime(time, 9, "£100"),
                this.createTime(time, 10, "£100"),
                this.createTime(time, 11, "£100"),
                this.createTime(time, 12, "£100"),
                this.createTime(time, 13, "£100"),
                this.createTime(time, 14, "£100"),
                this.createTime(time, 15, "£100"),
                this.createTime(time, 16, "£100"),
                this.createTime(time, 17, "£100"),
                this.createTime(time, 18, "£100"),
                this.createTime(time, 19, "£100"),
            ];
        }
        
        render() {
            return <Fragment>
                <Paragraph><i className="fas fa-calendar" /> &nbsp; { this.Month }</Paragraph>

                <ScrollingDatePicker.Component value={this.props.value} onChange={date => this.props.onChange(date)} />

                <NewLine />
                <NewLine />

                <TimePricePicker.Component value={this.props.value} hours={this.hours()} onChange={date => this.props.onChange(date)} />
            </Fragment>;
        }
    }
}