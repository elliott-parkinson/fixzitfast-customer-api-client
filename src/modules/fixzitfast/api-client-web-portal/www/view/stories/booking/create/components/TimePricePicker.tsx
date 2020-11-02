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



export namespace TimePricePicker
{
    let PriceRow = props => <Row className="p-1 m-1 selectable" onClick={props.onClick} >
        <Column>
            <Header size="sm"><small>{ props.time }</small></Header>
        </Column>
        <Column>
            <Button type="button" color={props.selected ? "primary" : "light"}  block disabled={props.value != "" ? undefined : true}>
                { props.value ? props.value : "Fully Booked" }
            </Button>
        </Column>
    </Row>;

    export interface IViewProps
    {
        className?: string;
        onChange?: Function;
        value: Date;
        hours: any[];
    }

    export class Component extends React.Component<IViewProps>
    {
        render() {
            return <Fragment>
                <Row>
                    <Column className="text-left">
                        <Header size="sm"><small>{ moment(this.props.value).format('MMMM, Do YYYY') }</small></Header>
                    </Column>
                    <Column className="text-center">
                        <Header size="sm"><small>Price</small></Header>
                    </Column>
                </Row>

                {this.props.value.getTime()}

                { this.props.hours.map( hour =>
                    <PriceRow
                        key={hour.time}
                        time={moment(hour.time).format('HH:mm')}
                        value={hour.price}
                        selected={hour.time.getTime() == this.props.value.getTime()}
                        onClick={e => this.props.onChange(hour.time)}
                    />
                )}
            </Fragment>;
        }
    }
}