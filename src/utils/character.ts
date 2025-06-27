export default (): string => {
	const characterRanges = [
		{ start: 0x20, end: 0x7f }, // 基本拉丁语 (0020 - 007F)
		{ start: 0x4e00, end: 0x9fff }, // CJK 统一汉字 (4E00 - 9FFF)
		{ start: 0xff00, end: 0xffef }, // 全角字符 (FF00 - FFEF)
		{ start: 0x3000, end: 0x303f }, // CJK 符号和标点 (3000 - 303F)
		{ start: 0x31c0, end: 0x31ef }, // CJK 符号扩展 (31C0 - 31EF)
	];

	const characters = characterRanges.flatMap(range =>
		Array.from({ length: range.end - range.start + 1 }, (_, i) => String.fromCharCode(range.start + i)),
	);

	return characters.join('');
};
