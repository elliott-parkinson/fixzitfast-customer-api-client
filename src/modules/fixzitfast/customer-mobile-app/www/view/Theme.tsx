import * as React from "react";
import {
    Container, Header
} from "../../../../reactstrap/building-blocks";

export * from "../../../../reactstrap/building-blocks";

export const HeaderArea = props => <Container className="app-header" fluid>
    <Header size="lg">
        {props.children}
    </Header>
</Container>;