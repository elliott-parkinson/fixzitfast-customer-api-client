import * as React from "react";
import Dependencies from "typedi";

import { 
    Alert,
	AppLayout, Titlebar, Fragment,
    Button,
    Container, Block,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup, InputGroupAddon, Typeahead, Label,
	Header, Paragraph,
	NewLine,
    Nav, NavItem, NavLink,
    Row, Column
} from "../../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";
export namespace Contact
{
    export class ContactForm
    {
        @observable Name = "";
        @observable PhoneNumber = "";
        @observable Email = "";
        @observable Message = "";
        @observable Agree = false;


        @observable Submitted = false;
        @observable Errors = [];

        @action SetName(name: string)
        {
            this.Name = name;
        }
        
        @action async Submit()
        {
            let contactStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("contact");

            await contactStore.SubmitContactRequest(this.Name, this.Email, this.PhoneNumber, this.Message, this.Agree);

            this.Submitted = true;
        }
    }

    @observer
    export class Screen extends React.Component<any>
    {
        @observable Router: any;

        @observable Form = new ContactForm;

        componentDidMount()
        {
            this.Router = Dependencies.of("store").get<any>("routes");
        }

    
        render() {
            return <Container>
               <Header size="lg">Contact Us</Header>

                <Row>
                    <Column sm={12} lg={6} className="p-3">
                        <Header size="md">Call Us</Header>
                        <Paragraph>0800 0948 9493</Paragraph>

                        <Header size="md">Email Us</Header>
                        <Paragraph>customersupport@fixzitfast.com</Paragraph>
                    </Column>
                    <Column sm={12} lg={6} className="p-3">
                        <Header size="sm">Office Opening Hours</Header>

                        <Row>
                            <Column xs={6} sm={4} lg={3} className="0">
                                Monday
                            </Column>
                            <Column xs={6} sm={4} lg={3} className="0">
                                8:30 - 5pm
                            </Column>
                        </Row>
                        <Row>
                            <Column xs={6} sm={4} lg={3} className="0">
                                Tuesday
                            </Column>
                            <Column xs={6} sm={4} lg={3} className="0">
                                8:30 - 5pm
                            </Column>
                        </Row>
                        <Row>
                            <Column xs={6} sm={4} lg={3} className="0">
                                Wednesday
                            </Column>
                            <Column xs={6} sm={4} lg={3} className="0">
                                8:30 - 5pm
                            </Column>
                        </Row>
                        <Row>
                            <Column xs={6} sm={4} lg={3} className="0">
                                Thursday
                            </Column>
                            <Column xs={6} sm={4} lg={3} className="0">
                                8:30 - 5pm
                            </Column>
                        </Row><Row>
                            <Column xs={6} sm={4} lg={3} className="0">
                                Friday
                            </Column>
                            <Column xs={6} sm={4} lg={3} className="0">
                                8:30 - 5pm
                            </Column>
                        </Row>
                        <Row>
                            <Column xs={6} sm={4} lg={3} className="0">
                                Saturday
                            </Column>
                            <Column xs={6} sm={4} lg={3} className="0">
                                Closed
                            </Column>
                        </Row>
                        <Row>
                            <Column xs={6} sm={4} lg={3} className="0">
                                Sunday
                            </Column>
                            <Column xs={6} sm={4} lg={3} className="0">
                                Closed
                            </Column>
                        </Row>
                    </Column>
                </Row>


               <Paragraph>
                   Contact us using our form below. Depending on your request we usually respond on the same day or up to 48 hours after submission. Thank you!
               </Paragraph>
               <Card className="animate__animated animate__fadeIn animate__delay-02s">
                    <CardBody className="p-4 m-4">
                        { this.Form.Submitted == true ?
                            <Alert color="success">
                                <i className="fas fa-check" /> &nbsp; Thank you, your form has been successfully submitted. Depending on your request we usually respond on the same day or up to 48 hours after submission.
                            </Alert>
                        :
                            <Form onSubmit={e => { e.preventDefault(); this.Form.Submit(); return false; }}>
                                <Row>
                                    <Column sm={6} lg={4} className="p-3">
                                        <FormGroup tag="fieldset">
                                            <Label>
                                                Name (Required)
                                            </Label>
                                            <Input type="text" required placeholder="Enter Full Name" value={this.Form.Name} onChange={ e => this.Form.Name = e.target.value } />{' '}
                                        </FormGroup>
                                    </Column>
                                    <Column sm={6} lg={4} className="p-3">
                                        <FormGroup tag="fieldset">
                                            <Label>
                                                Email (Required)
                                            </Label>
                                            <Input type="text" required placeholder="Enter Email" value={this.Form.Email} onChange={ e => this.Form.Email = e.target.value } />{' '}
                                        </FormGroup>
                                    </Column>
                                    <Column sm={6} lg={4} className="p-3">
                                        <FormGroup tag="fieldset">
                                            <Label>
                                                Phone
                                            </Label>
                                            <Input type="text"  placeholder="eg: 07959 484858" value={this.Form.PhoneNumber} onChange={ e => this.Form.PhoneNumber = e.target.value } />{' '}
                                        </FormGroup>
                                    </Column>
                                </Row>

                                <FormGroup tag="fieldset">
                                    <Label>
                                        Please, describe your request or add any comments below:
                                    </Label>
                                    <Input type="textarea" required  rows={7} placeholder="How can we help?" value={this.Form.Message} onChange={ e => this.Form.Message = e.target.value } />{' '}
                                </FormGroup>

                                <FormGroup tag="fieldset" className="p-4">
                                    <Input type="checkbox" id="agree" required value={this.Form.Agree ? "true" : "false"} onChange={ e => this.Form.Agree = (e.target.value == "true" ? true : false) } />{' '}
                                    <Label for="agree">
                                        I have read and agree with Fixzitfast Privacy Policy and Terms &amp; Conditions.
                                    </Label>
                                </FormGroup>

                                <Button color="primary" block>Submit Message</Button>
                            </Form>
                        }
                    </CardBody>
                </Card>
            </Container>;
        }
    }
}