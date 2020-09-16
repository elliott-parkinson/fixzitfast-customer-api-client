import * as React from "react";
import Dependencies from "typedi";

import { 
    AppLayout, Titlebar, Fragment,
    Badge,
    Button,
    Container,
	Card, CardBody, CardHeader, CardFooter,
	Form, FormGroup, Input, InputGroup,
	Header,
	NewLine,
    Row, Column
} from "../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";
import { ApiResponseArea } from "./ApiResponseArea";
import { ApiResponseData } from "../model/ApiResponseData";

export namespace TestCard
{
    export interface IViewProps
    {
        formElements?: any;
        title: string;
        form: any;
    }

    export const Component = observer((props: IViewProps) => <Container>
        <Form onSubmit={e => { props.form.Submit(); e.preventDefault(); return false; }}>
            <Card>
                <CardHeader>
                    <Row>
                        <Column>
                            <Header size="sm">
                                <i className="fas fa-route" /> &nbsp; {props.title}
                                { props.form.ResponseData.Performed && <Fragment>
                                    &nbsp;
                                    <Badge
                                        color={ props.form.ResponseData.Success == true ? "success" : "danger" }
                                    >
                                        { props.form.ResponseData.Success == true ? "Success" : "Failed" }
                                    </Badge>
                                </Fragment> }
                            </Header>
                        </Column>
                        <Column>
                            <div className="text-right">
                                <Button color="primary" disabled={props.form.ResponseData.Loading ? true : undefined}>
                                    { props.form.ResponseData.Loading == false?
                                        <Fragment>
                                            <i className="fas fa-play" /> &nbsp; 
                                            Run
                                        </Fragment>
                                    :
                                        <Fragment>
                                            Loading...
                                        </Fragment>
                                    }
                                    
                                </Button>
                            </div>
                        </Column>
                    </Row>
                </CardHeader>
                { props.formElements && 
                    <CardBody>
                        {props.formElements}
                    </CardBody>
                }
                { props.form.ResponseData.Performed &&
                    <CardFooter>
                        <ApiResponseArea.Component
                            performed={props.form.ResponseData.Performed}
                            loading={props.form.ResponseData.Loading}
                            success={props.form.ResponseData.Success}
                            errorMessage={props.form.ResponseData.ErrorMessage}
                            data={props.form.ResponseData.Data}
                        />
                    </CardFooter>
                }
            </Card>
        </Form>
    </Container>);
}