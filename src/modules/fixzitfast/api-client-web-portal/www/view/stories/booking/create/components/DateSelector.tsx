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
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        Day: string;
        Month: string;
        Year: string;

        @observable SelectedDate: Date;

        constructor(props)
        {
            super(props);
            
            let date = new Date();
            date.setHours(8, 0, 0);

            this.Day = moment(date).format('Do');
            this.Month = moment(date).format('MMMM');
            this.Year = moment(date).format('YYYY');

            this.SelectedDate = date;
        }

        @action SelectDate(date: Date)
        {
            this.SelectedDate = date;
            console.log("select date", date.getTime());
        }

        @computed get hours()
        {
            let time = this.SelectedDate;

            return [
                { time: new Date(time.setHours(8, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(9, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(10, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(11, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(12, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(13, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(14, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(15, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(16, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(17, 0, 0) ), price: "£100" },
                { time: new Date(time.setHours(18, 0, 0) ), price: "£100" },
            ];
        }
        
        render() {
            return <Fragment>
                <Paragraph><i className="fas fa-calendar" /> &nbsp; { this.Month }</Paragraph>

                <ScrollingDatePicker.Component value={this.SelectedDate} onChange={date => this.SelectDate(date)} />

                <NewLine />
                <NewLine />
                <TimePricePicker.Component value={this.SelectedDate} hours={this.hours} onChange={date => this.SelectDate(date)} />
            </Fragment>;
        }
    }
}