import * as React from "react";

export const Image = props => <picture className={props.className} onLoad={props.onLoad}>
	{ props.sources.map(source => <source srcSet={source.set} type={source.type} sizes={source.sizes} media={source.media} />) }

	<img className={props.imageClassName} loading="auto" onLoad={props.onLoad} />
</picture>;