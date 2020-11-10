import * as React from "react";

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
    let PriceRow = props => <Badge className={"w-100 m-1 selectable" + (props.selected ? " selected" : "")} color={props.selected ? "primary" : "light"}>
        <Row className="p-2" onClick={props.onClick} >
            <Column className="text-left pl-4">
                <Header size="sm"><small>{ props.time }</small></Header>
            </Column>
            <Column className="text-center">
                <Header size="sm">{ props.value ? props.value : "Fully Booked" }</Header>
                
            </Column>
        </Row>
    </Badge>;

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
                <Row className="mb-3 ml-1 mr-1 mt-4">
                    <Column className="text-left">
                        <Header size="sm"><small>{ moment(this.props.value).format('MMMM, Do YYYY') }</small></Header>
                    </Column>
                    <Column className="text-center">
                        <Header size="sm"><small><strong>Price</strong></small></Header>
                    </Column>
                </Row>

                <div className="prices">
                    { this.props.hours.map( hour =>
                        <PriceRow
                            key={hour.time}
                            time={moment(hour.time).format('HH:mm')}
                            value={hour.price}
                            selected={ hour.selected }
                            onClick={e => this.props.onChange(hour.time)}
                        />
                    )}
                </div>
            </Fragment>;
        }
    }
}