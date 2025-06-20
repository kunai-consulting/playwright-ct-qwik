/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// @ts-check
// This file is injected into the registry as text, no dependencies are allowed.

import { renderToString } from "@builder.io/qwik/server";
import { jsx } from "@builder.io/qwik";

/** @typedef {import('@playwright/experimental-ct-core/types/component').JsxComponent} JsxComponent */

/**
 * @param {any} component
 * @returns {component is JsxComponent}
 */
function isJsxComponent(component) {
  return typeof component === 'object' && component && component.__pw_type === 'jsx';
}

function assertMountNotation(component) {
  console.log('assertMountNotation - component:', component);
  console.log('assertMountNotation - typeof component:', typeof component);
  console.log('assertMountNotation - component.__pw_type:', component?.__pw_type);
  console.log('assertMountNotation - isJsxComponent result:', isJsxComponent(component));
  
  // if (!isJsxComponent(component))
  //   throw new Error('Object mount notation is not supported');
}

/**
 * @param {any} value
 */
function __pwCreateComponent(value) {
  console.log('=== __pwCreateComponent DEBUG ===');
  console.log('Input value:', JSON.stringify(value, null, 2));
  
  return window.__pwTransformObject(value, v => {
    if (isJsxComponent(v) && v.__pw_type === 'object-component') {
      console.log('=== OBJECT-COMPONENT PROCESSING ===');
      console.log('Full component object:', v);
      console.log('component.type:', v.type);
      console.log('component.type type:', typeof v.type);
      
      // Try to find the actual component function
      if (v.type && typeof v.type.type === 'function') {
        console.log('Found component function:', v.type.type);
        return { result: v.type };
      } else if (v.type) {
        console.log('Using component.type directly:', v.type);
        return { result: v.type };
      }
    }
    
    // Handle jsx components normally
    if (isJsxComponent(v)) {
      const component = v;
      
      // Handle object-component type (Qwik components)
      if (component.__pw_type === 'object-component') {
        // For object-component, the actual component is in component.type
        return { result: component.type };
      }
      
      // Handle jsx type (traditional JSX)
      const props = component.props ? __pwCreateComponent(component.props) : {};
      if (typeof component.type === 'string') {
        const { children, ...propsWithoutChildren } = props;
        return { result: jsx(component.type, propsWithoutChildren, children) };
      }
      return { result: jsx(component.type, props) };
    }
  });
}

const __pwUnmountKey = Symbol('unmountKey');

window.playwrightMount = async (component, rootElement, hooksConfig) => {
  console.log('Before mount:', rootElement.innerHTML);
  
  assertMountNotation(component);

  console.log("COMPONENT", component)
  let App = () => __pwCreateComponent(component);
  for (const hook of window.__pw_hooks_before_mount || []) {
    const wrapper = await hook({ App, hooksConfig });
    if (wrapper)
      App = () => wrapper;
  }

  const ssrResult = await renderToString(App());
  console.log('SSR result:', ssrResult.html);

  rootElement.innerHTML = ssrResult.html;
  console.log('After mount:', rootElement.innerHTML);
  
  rootElement[__pwUnmountKey] = () => {
    rootElement.innerHTML = '';
  };

  for (const hook of window.__pw_hooks_after_mount || [])
    await hook({ hooksConfig });
};

window.playwrightUnmount = async rootElement => {
  const unmount = rootElement[__pwUnmountKey];
  if (!unmount)
    throw new Error('Component was not mounted');

  unmount();
  delete rootElement[__pwUnmountKey];
};

window.playwrightUpdate = async (rootElement, component) => {
  if (!isJsxComponent(component))
    throw new Error('Object mount notation is not supported');

  window.playwrightUnmount(rootElement);
  window.playwrightMount(component, rootElement, {});
};