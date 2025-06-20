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
  // Check for standard jsx components
  if (typeof component === 'object' && component && component.__pw_type === 'jsx') {
    return true;
  }
  
  // Check for object-component types
  if (typeof component === 'object' && component && component.__pw_type === 'object-component') {
    return true;
  }
  
  // Check for the inner component structure (the one with props)
  if (typeof component === 'object' && component && component.props && typeof component.props === 'object') {
    return true;
  }
  
  return false;
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
  return window.__pwTransformObject(value, v => {
    if (isJsxComponent(v)) {
      const component = v;
      
      // Handle object-component type - just return the component directly
      if (component.__pw_type === 'object-component') {
        console.log('Object component type:', component.type);
        console.log('Type of component.type:', typeof component.type);
        console.log('Component.type keys:', Object.keys(component.type));
        console.log('Component.type.type:', component.type.type);
        console.log('Type of component.type.type:', typeof component.type.type);
        console.log('Component.type.props:', component.type.props);
        
        // Call the component function with the props
        if (typeof component.type.type === 'function' && component.type.props) {
          console.log('Calling component function with props');
          const result = component.type.type(component.type.props, component.type.key, component.type.flags);
          console.log('Component function result:', result);
          return { result };
        }
        
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

  const ssrResult = await renderToString(App(), {
    containerTagName: 'div',
    qwikLoader: { include: "always" }
  });
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