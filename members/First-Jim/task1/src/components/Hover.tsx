/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React from 'react';
import { useHover } from 'react-use';

interface IProps {
	render: (hovered: boolean) => React.ReactElement;
}

export const Hover = (props: IProps) => {
	const [hoverable] = useHover(props.render);
	return hoverable;
};
