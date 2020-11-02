import Dependencies, { Service } from "typedi";

import * as React from "react";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";
import { 
    Fragment,
    Button,
    Header,
    Block, Row, Column, NewLine
} from "../../../../Theme";


import Stepper from "react-stepper-horizontal";


export namespace CreateBookingStepper
{
    export interface IViewProps
    {
        position: number;
        className?: string;

        onBack?: Function;
    }

    export class Component extends React.Component<IViewProps>
    {
        @observable Router: any;

        componentDidMount()
        {
            this.Router = Dependencies.of("store").get<any>("routes");
        }

        render() {
            return <div className={this.props.className}>
                <Row className="booking-form-stepper">
                    <Column lg={2} md={3} className="text-center p-0 d-none d-md-flex">
                        <Button color="primary" className="text-center p-3" outline onClick={this.props.onBack}>
                            <i className="fas fa-arrow-left" /> &nbsp;
                            Back
                        </Button>
                    </Column>
                    <Column lg={10} md={9} className="text-center p-0">
                        <Stepper
                            defaultBorderWidth={55}
                            size={24}
                            titleTop={-58}
                            titleFontSize={14}
                            circleFontSize={0}
                            defaultColor="#e6e9f0"
                            defaultTitleColor="#e6e9f0"
                            defaultBorderColor="#e6e9f0"
                            activeBorderColor="#e6e9f0"
                            completeBorderColor="#e6e9f0"
                            defaultBarColor="#e6e9f0"
                            activeStep={this.props.position}
                            activeColor="#ff9505"
                            activeTitleColor="#ff9505"
                            completeColor="#ff9505"
                            completeBarColor="#ff9505"
                            completeTitleColor="#ff9505"
                            circleTop={34}
                            lineMarginOffset={0}
                            steps={[
                                {
                                    title: 'Booking',
                                    href: "#",
                                    onClick: e => this.Router.Go("/booking/create/details")
                                },
                                {
                                    title: 'Time',
                                    href: "#",
                                    onClick: e => this.Router.Go("/booking/create/times")
                                },
                                {
                                    title: 'Contact',
                                    href: "#",
                                    onClick: e => this.Router.Go("/booking/create/contact")
                                },
                                {
                                    title: 'Pay',
                                    href: "#",
                                    onClick: e => this.Router.Go("/booking/create/paymentdetails")
                                }
                            ]}
                        />
                    </Column>
                </Row>
                <NewLine />
            </div>;
        }
    }
}