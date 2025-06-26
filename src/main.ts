import path from 'node:path';
import pLimit from 'p-limit';
import { globSync } from 'glob';
import fontProcess from './fontProcess';

// 获取待处理字体
const fontProcessList = globSync('**/*.ttf', {
	cwd: path.join(import.meta.dirname, '../fonts'),
	absolute: true,
}).map(file => {
	const filename = path.basename(file, '.ttf');
	const dirname = path.dirname(file);

	// 生成输出路径
	const distDir = path.join(import.meta.dirname, '../dist');
	const relativePath = path.relative(path.join(import.meta.dirname, '../fonts'), dirname);
	const outputDir = path.join(distDir, relativePath);
	const output = path.join(outputDir, `${filename}.woff2`);

	return {
		input: file,
		output,
	};
});

console.info(`有 ${fontProcessList.length} 个字体文件待处理`);
console.info(`待处理字体：\n${fontProcessList.map(item => item.input).join('\n')}\n`);

// 限制并发处理数量
const limit = pLimit(5);

await Promise.all(fontProcessList.map(item => limit(() => fontProcess(item))));
