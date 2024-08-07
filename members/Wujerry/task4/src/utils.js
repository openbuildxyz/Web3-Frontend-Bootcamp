export function formatAddr(addr) {
	return addr.slice(0, 6) + '...' + addr.slice(-4)
}