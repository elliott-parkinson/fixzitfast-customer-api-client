import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

export interface IManagedImageProps
{
	imageClassName: string;
	media: any;
	sizes: any;
	set: any;
}

@observer
export class Image extends React.Component<any>
{
	@observable Loaded: boolean = false;

	@action SetLoaded()
	{
		this.Loaded = true;

		if (this.props.onLoad &&  (typeof this.props.onLoad === "function") )
		{
			this.props.onLoad();
		}
	}

	render() {
		return <picture className={this.props.className} onLoad={e => this.SetLoaded()}>
			{ this.props.sources.map(source => <source srcSet={source.set} type={source.type} sizes={source.sizes} media={source.media} />) }
		
			<img className={this.props.imageClassName} loading="lazy" onLoad={this.props.onLoad} />
		</picture>;
	}
}


