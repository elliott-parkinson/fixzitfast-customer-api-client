import * as React from "react";
import {
    Container, Header
} from "../../packages/reactstrap/building-blocks";

export * from "../../packages/reactstrap/building-blocks";

export const HeaderArea = props => <Container className="app-header" fluid>
    <Header size="lg">
        {props.children}
    </Header>
</Container>;