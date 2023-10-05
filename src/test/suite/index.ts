const path = require('path');
const Mocha = require('mocha');
const glob = require('glob');

export function run(): Promise<void> {
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd',
		color: true
	});

	const testsRoot = path.resolve(__dirname, '..');

	return new Promise<void>((c, e) => {
		const testFiles = new glob.Glob("**/**.test.js", { cwd: testsRoot });
		const testFileStream = testFiles.stream();

		testFileStream.on("data", (file: string) => { // Specify the type of 'file' as string
			mocha.addFile(path.resolve(testsRoot, file));
		});
		testFileStream.on("error", (err: Error) => { // Specify the type of 'err' as Error
			e(err);
		});
		testFileStream.on("end", () => {
			try {
				// Run the mocha test
				mocha.run((failures: number) => { // Specify the type of 'failures' as number
					if (failures > 0) {
						e(new Error(`${failures} tests failed.`));
					} else {
						c();
					}
				});
			} catch (err) {
				console.error(err);
				e(err);
			}
		});
	});
}
