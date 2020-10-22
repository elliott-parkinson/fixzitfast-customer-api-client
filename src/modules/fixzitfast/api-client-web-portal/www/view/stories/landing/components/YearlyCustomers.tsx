import * as React from "react";
import Dependencies from "typedi";

import { 
	Fragment, Container,
    Row, Column, Block, Header, Paragraph
} from "../../../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace YearlyCustomers
{
    export interface IViewProps
    {
        
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        @observable CustomersStore: any;
        @observable Total: number = 0;

        async componentDidMount()
        {
            
            if (Dependencies.of("fixzitfast-customer-data-store").has<any>("customers"))
            {
                this.CustomersStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("customers");
            }

            let customers = await this.CustomersStore?.GetTotalCustomers();
            this.SetTotal(customers);
        }

        @action SetTotal(value: number)
        {
            let incrementer = () => {
                let difference = value - this.Total;
                if (difference <= 1)
                {
                    difference = 2;
                }
                let increment = Math.ceil(difference / 2);

                this.Total += increment;

                if (this.Total < value)
                {
                    setTimeout(incrementer, 100);
                }
            }
            if (this.Total < value)
            {
                setTimeout(incrementer, 100);
            }
            else
            {
                this.Total = value;
            }
        }

        @computed get TotalNumbers()
        {
            if (this.Total)
            {
                var num_parts = this.Total.toString().split(".");
                num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
                return num_parts.join(".");
            }

            return "";
        }

        render() {
            return <div className="yearly-customers-bar">
                <Container>
                    <Row className="animate__animated animate__fadeIn animate__delay-02s">
                        <Column lg={6} className="vertical-center">
                            <Block>
                                <Header size="lg" className="main-text">
                                    Customers this year
                                </Header>
                            </Block>
                        </Column>
                        <Column lg={6} className="vertical-center">
                            <Block>
                                <Header size="lg" className="details-text">
                                    { this.TotalNumbers }
                                </Header>
                            </Block>
                        </Column>
                    </Row>
                </Container>
            </div>
        }
    }
}