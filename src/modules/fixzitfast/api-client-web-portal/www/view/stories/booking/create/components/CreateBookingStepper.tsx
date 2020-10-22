import * as React from "react";

import { 
    Fragment,
    Button,
    Header,
    Block, Row, Column
} from "../../../../Theme";


import Stepper from "react-stepper-horizontal";


export namespace CreateBookingStepper
{
    export interface IViewProps
    {
        position: number;

        onBack?: Function;
    }

    export class Component extends React.Component<IViewProps>
    {
        render() {
            return <Block>
                <Row className="booking-form-stepper">
                    <Column md={3} xs={12} className="text-center">
                        <Button color="primary" outline onClick={this.props.onBack}>
                            <i className="fas fa-arrow-left" /> &nbsp;
                            Back
                        </Button>
                    </Column>
                    <Column md={9} xs={12}>
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
                            completeTitleColor="#ff9505"
                            circleTop={34}
                            lineMarginOffset={0}
                            steps={[
                                {
                                    title: 'Details',
                                    href: "#",
                                    onClick: e => console.log(1)
                                },
                                {
                                    title: 'Contact',
                                    href: "#",
                                    onClick: e => console.log(2)
                                },
                                {
                                    title: 'Times & Pricing',
                                    href: "#",
                                    onClick: e => console.log(3)
                                },
                                {
                                    title: 'Pay',
                                    href: "#",
                                    onClick: e => console.log(4)
                                }
                            ]}
                        />
                    </Column>
                </Row>
            </Block>;
        }
    }
}