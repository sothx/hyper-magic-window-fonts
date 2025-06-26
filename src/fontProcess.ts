import fs from 'node:fs';
import path from 'node:path';
import Fontmin from 'fontmin';
import character from './utils/character';

export type FontProcessType = {
	input: string;
	output: string;
};

// 创建字体处理实例
const createFontmin = () =>
	new Fontmin()
		.use(
			Fontmin.glyph({
				text: character(),
				hinting: false,
			}),
		)
		.use(Fontmin.ttf2woff2());

// 处理字体文件
export default function processFont(item: FontProcessType): Promise<void> {
	console.info(`字体 ${item.input} 进入队列，开始处理...`);

	const fontBuffer = fs.readFileSync(item.input);
	const fontmin = createFontmin();

	return new Promise<void>((resolve, reject) => {
		fontmin.src(fontBuffer).run((err: Error, files: any[]): void => {
			if (err) {
				console.error(`处理字体 ${item.input} 时出错:`, err);
				reject(err);
				return;
			}
			console.info(`字体 ${item.input} 处理完成，输出到 ${item.output}`);
			fs.mkdirSync(path.dirname(item.output), { recursive: true });
			fs.writeFileSync(item.output, files[1].contents);
			resolve();
		});
	});
}
