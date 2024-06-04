interface SvgProps {
	name: string; // 图标的名称
	color?: string; // 图标的颜色
	prefix?: string; // 图标的前缀 默认icon
	iconStyle?: { [key: string]: any }; // 图标的样式
}

export default function SvgIcon(props: SvgProps) {
	const { name, color, prefix = 'icon', iconStyle = { width: '100px', height: '100px' } } = props;
	const symbolId = `#${prefix}-${name}`;
	return (
		<svg aria-hidden="true" style={iconStyle}>
			<use href={symbolId} />
		</svg>
	);
}
