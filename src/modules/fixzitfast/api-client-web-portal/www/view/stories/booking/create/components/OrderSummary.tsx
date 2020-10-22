import * as React from "react";

import { 
    Fragment,
    Button,
    Header, NewLine
} from "../../../../Theme";


export namespace OrderSummary
{
    export interface IViewProps
    {
        service?: any;
        location?: any;

        total?: string;

        onChangeService?: Function;
        onChangeLocation?: Function;
    }

    export class Component extends React.Component<IViewProps>
    {
        render() {
            return <Fragment>
                <Header size="xs">Your Order Summary</Header>

                { this.props.location && <Fragment>
                    Location
                    <NewLine />
                    <i className="fas fa-map-marker-alt" /> &nbsp; { [this.props.location.Line1, this.props.location.Line2, this.props.location.Line3, this.props.location.Town, this.props.location.County, this.props.location.Postcode].filter(n => n).join(", ") }
                </Fragment> }
                <NewLine />
                <NewLine />

                { this.props.service && <Fragment>
                    Service Summary
                    <NewLine />
                    { this.props.service.CategoryName }
                </Fragment> }

                { this.props.total && <Fragment>
                    <hr />

                </Fragment> }
            </Fragment>;
        }
    }
}