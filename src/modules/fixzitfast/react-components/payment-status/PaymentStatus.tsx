import * as React from "react";
import "./payment-status.scss";


let STATUSTEXTS = {
	"done": "Payment Done",
	"processing": "Processing Payment",
	"failed": "Payment Failed"
};

export namespace PaymentStatus
{
    export interface IViewProps
    {
        
    }

    export class Component extends React.Component<any>
    {
        render() {
            return <div 
					className={["payment-status", this.props.className].join(" ")} 
					style={this.props.style}
					onClick={ this.props.onClick ? this.props.onClick : undefined}
				>
				
				<div className={"indicator " + this.props.status}>
					<div className="indicator-icon">
						{ this.props.status=="done" && <i className="fas fa-check" /> }
						{ this.props.status=="processing" && <i className="fas fa-lock" /> }
						{ this.props.status=="failed" && <i className="fas fa-times" /> }
					</div>
				</div>
			
				{ this.props.status && <div className="status-text">
					{ STATUSTEXTS[this.props.status] }
				</div> } 
			</div>;
        }
    }
}