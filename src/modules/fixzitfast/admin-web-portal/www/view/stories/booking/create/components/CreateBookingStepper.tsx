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
                        <Button outline onClick={this.props.onBack}>
                            <i className="fas fa-arrow-left" /> &nbsp;
                            Back
                        </Button>
                    </Column>
                    <Column md={9} xs={12}>
                        <Stepper
                                defaultBorderWidth={5}
                                size={12}
                                titleTop={-44}
                                circleFontSize={0}
                                activeStep={this.props.position}
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