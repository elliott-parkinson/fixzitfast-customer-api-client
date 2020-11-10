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



export namespace ScrollingDatePicker
{
    export class Dates 
    {
        static getMonday(date: Date)
        {
            date = new Date(date);
            var day = date.getDay(),
                diff = date.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday

            if (date.getHours() < 7 || date.getHours() > 19)
            {
                date.setHours(7, 0, 0);
            }

            return new Date(date.setDate(diff));
        }
        static getNextDay(date: Date)
        {
            date = new Date(date);
            
            return new Date(date.setDate( date.getDate() + 1 ));
        }

        static getWeek(date: Date)
        {
            let monday = Dates.getMonday(date);
            let tuesday = Dates.getNextDay(monday);
            let wednesday = Dates.getNextDay(tuesday);
            let thursday = Dates.getNextDay(wednesday);
            let friday = Dates.getNextDay(thursday);
            let saturday = Dates.getNextDay(friday);
            let sunday = Dates.getNextDay(saturday);

            return [
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday
            ];
        }

        static sameDay(date1: Date, date2: Date)
        {
            return date1.getFullYear() === date2.getFullYear() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getDate() === date2.getDate();
        }
    }

    export interface IViewProps
    {
        className?: string;
        onChange?: Function;
        value: Date;
    }

    let DateButton = props => <Badge color={props.selected ? "primary" : "light"} className="p-4 m-2 clickable" onClick={props.onClick}>
        { moment(props.date).format('ddd') }
        <NewLine />
        <Header size="xs">
            { moment(props.date).format('Do') }
        </Header>
        <NewLine />
        <NewLine />
        { props.text }
    </Badge>;

    @observer
    export class Component extends React.Component<IViewProps>
    {
        Weekdays: Date[];
        @observable CurrentScroll: number = 0;
        @observable ScrollWidth: number = 1;

        constructor(props)
        {
            super(props);
            
            this.Weekdays = Dates.getWeek(props.value);
        }

        componentDidUpdate()
        {
            this.Weekdays = Dates.getWeek(this.props.value);
        }

        @action scrollDatesLeft()
        {
            let list = document.getElementById("dates-list");
            this.CurrentScroll = list.scrollLeft - 144.90;
            list.scroll({
                left: list.scrollLeft - 144.90,
                top: list.scrollTop,
                behavior: "smooth"
            });
        }
        
        @action scrollDatesRight()
        {
            let list = document.getElementById("dates-list");
            this.CurrentScroll = list.scrollLeft + 144.90;
            list.scroll({
                left: list.scrollLeft + 144.90,
                top: list.scrollTop,
                behavior: "smooth"
            });
            this.ScrollWidth = list.scrollWidth - list.getBoundingClientRect().width;
        }
        
        render() {
            return <div className="d-inline-flex flex-row justify-content-between w-100">
                <div className="d-flex h-100 align-self-center p-2">
                    <Button className="align-self-center p-2" type="button" color="light" onClick={e => this.scrollDatesLeft() } disabled={this.CurrentScroll <= 0 ? true : undefined}>
                        <i className="fas fa-chevron-left" />
                    </Button>
                </div>

                <div id="dates-list" className="d-flex w-100 h-100 flex-row justify-content-start" style={{ overflowX: "hidden"}}>
                    { this.Weekdays.map(day => 
                        <DateButton key={day}
                            date={day}
                            text="n/a" 
                            selected={ Dates.sameDay(day, this.props.value) }
                            onClick={ e => this.props.onChange(day) }
                        /> 
                    )}
                </div>

                <div className="d-flex h-100 align-self-center p-2">
                    <Button className="align-self-center p-2" type="button" color="light" onClick={e => this.scrollDatesRight() } disabled={this.CurrentScroll >= this.ScrollWidth ? true : undefined}>
                        <i className="fas fa-chevron-right" />
                    </Button>
                </div>
            </div>;
        }
    }
}