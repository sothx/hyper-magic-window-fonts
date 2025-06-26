export default (): string => {
	const characterRanges = [
		{ start: 0x20, end: 0x7f }, // 基本拉丁语 (0020 - 007F)
		{ start: 0x4e00, end: 0x9fff }, // CJK 统一汉字 (4E00 - 9FFF)
	];

	const characters = characterRanges.flatMap(range =>
		Array.from({ length: range.end - range.start + 1 }, (_, i) => String.fromCharCode(range.start + i)),
	);

	return characters.join('');
};
