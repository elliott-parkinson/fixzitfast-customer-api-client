import * as React from "react";
import Dependencies from "typedi";

import { 
	AppLayout, Titlebar, Fragment,
    Button,
    Container, Block,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup, InputGroupAddon, Typeahead,
	Header, Paragraph,
	NewLine,
    Nav, NavItem, NavLink,
    Rating,
    Row, Column
} from "../../../Theme";
import { ServiceCard, ServiceIcon } from "../../../../../../react-components";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace TestimonialsBanner
{
    export interface IViewProps
    {
        
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        @observable Router: any;
        @observable TestimonialsStore: any;

        @observable TestimonialsList: any = [];

        async componentDidMount()
        {
            this.Router =  Dependencies.of("store").get<any>("routes");
            
            if (Dependencies.of("fixzitfast-customer-data-store").has<any>("customers"))
            {
                this.TestimonialsStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("testimonials");

                let testimonials = await this.TestimonialsStore?.GetFeatured();
                this.SetTestimonials(testimonials);
            }

        }

        @action SetTestimonials(testimonials: any)
        {
            this.TestimonialsList = testimonials;
        }

        render() {
            return <Container>
                <Row>
                    <Column lg={6} className="banner-jumbo">
                        <Header size="lg">Taking care of our customers</Header>
                        <Paragraph>From background checking all our tradespeople, to using electric vans, we’re determined to bring you the fastest, greenest and best home-repair service in the city.</Paragraph>
                    </Column>
                    <Column lg={6} className="vertical-center p-0">
                        <Row className="testimonials-block w-100">
                            {this.TestimonialsList?.map( testimonial => <Column md={4} sm={12} xs={12} key={testimonial.Id} className="p-1">
                                <Card className="testimonial-card">
                                    <CardBody className="text-center">
                                        <NewLine />
                                        <NewLine />
                                        <Header size="xs">
                                            <strong>
                                                {testimonial.Name}
                                            </strong>
                                        </Header>
                                        <Rating rating={testimonial.StarRating}
                                            icons={{
                                                complete: 'fa fa-star',
                                                half: 'fas fa-star-half-alt',
                                                empty: 'far fa-star',
                                            }}
                                            setColors={['rgb(255, 182, 39)', 'rgb(255, 182, 39)', '#434b4d']}
                                        />
                                        <Paragraph className="text-left">
                                            <small>
                                                {testimonial.Excerpt}
                                            </small>
                                        </Paragraph>
                                    </CardBody>
                                </Card>
                            </Column>)}
                        </Row>
                    </Column>
                </Row>
            </Container>;
        }
    }
}