/** @jsxImportSource @builder.io/qwik */

import { test, expect } from "@kunai-consulting/experimental-ct-qwik";
import { Button } from "../src/components/button";
import { $ } from "@builder.io/qwik";

test("execute callback when the button is clicked", async ({ mount }) => {
	const messages: string[] = [];

	const component = await mount(
		<Button
			title="Submit"
		/>,
	);
	await component.click();
	expect(messages).toEqual(["hello"]);
});

// test("execute callback when a child node is clicked", async ({ mount }) => {
// 	let clickFired = false;
// 	const component = await mount(
// 		<DefaultChildren>
// 			<span onClick={() => (clickFired = true)}>Main Content</span>
// 		</DefaultChildren>,
// 	);
// 	await component.getByText("Main Content").click();
// 	expect(clickFired).toBeTruthy();
// });
