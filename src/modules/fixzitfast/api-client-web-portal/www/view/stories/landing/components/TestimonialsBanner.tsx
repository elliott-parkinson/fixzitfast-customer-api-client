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
            this.TestimonialsStore =  Dependencies.of("fixzitfast-customer-store").get<any>("testimonials");

            let testimonials = await this.TestimonialsStore.GetFeaturedTestimonials();
            this.SetTestimonials(testimonials);
        }

        @action SetTestimonials(testimonials: any)
        {
            this.TestimonialsList = testimonials;
        }

        render() {
            return <Row>
                <Column lg={6} className="vertical-center">
                    <Header>Your satisfaction matters to us. Our guarantee is our name: if you’re not happy, we’ll Fixzitfast.</Header>
                    <Paragraph>From background checking all our tradespeople, to using electric vans, we’re determined to bring you the fastest, greenest and best home-repair service in the city.</Paragraph>
                </Column>
                <Column lg={6} className="">
                    <Row className="testimonials-block w-100">
                        {this.TestimonialsList.map( testimonial => <Column md={4} sm={12} xs={12} key={testimonial.Id} className="p-1">
                            <Card className="testimonial-card">
                                <CardBody className="text-center">
                                    <Button color="primary" disabled className="rounded-circle">
                                        <i className="fas fa-images" />
                                    </Button>
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
                                        setColors={['#d9ad26', '#d9ad26', '#434b4d']}
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
            </Row>;
        }
    }
}