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
        service?: string;
        location?: string;

        total?: string;

        onChangeService?: Function;
        onChangeLocation?: Function;
    }

    export class Component extends React.Component<IViewProps>
    {
        render() {
            return <Fragment>
                <Header size="sm">Your Order Summary</Header>

                { this.props.service && <Fragment>
                    Service
                    <NewLine />
                    { this.props.service }
                    <NewLine />
                    <NewLine />
                </Fragment> }

                { this.props.location && <Fragment>
                    Location
                    <NewLine />
                    { this.props.location }
                </Fragment> }
                { this.props.total && <Fragment>
                    <hr />

                </Fragment> }
            </Fragment>;
        }
    }
}