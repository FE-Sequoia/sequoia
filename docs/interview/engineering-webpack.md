---
outline: deep
---

# 前端工程化

```
Webpack/Vite 打包原理、Loader/Plugin 编写

NPM、模块化（CommonJS vs ESModule）

Babel 转译原理

Git 多人协作流程
```

## webpack

## 1.概念速览

`Webpack`是`JavaScript`应用程序的静态模块打包工具，会递归创建一个依赖关系图，其中包含应该程序需要的模块，然后将这些模块打包成一个或多个`Bundle`。

`Webpack` 最核心的功能是将各种类型的资源，包括图片、CSS、JS等，转译、组合、拼接、生成JS格式等Bundler文件。

<div  align="center">
    <img src="/public/2506181.png" width="680" alt="webpack 流程图" align="center" />
</div>

这个过程核心完成了 **内容转换 + 资源合并** 两种功能，实现上包含三个阶段：
1. 初始化阶段
	1. **初始化参数**：从配置文件、 配置对象、Shell 参数中读取，与默认配置结合得出最终的参数
	2. **创建编译器对象**：用上一步得到的参数创建 `Compiler` 对象
	3. **初始化编译环境**：包括注入内置插件、注册各种模块工厂、初始化 RuleSet 集合、加载配置的插件等
	4. **开始编译**：执行 `compiler` 对象的 `run` 方法
	5. **确定入口**：根据配置中的 `entry` 找出所有的入口文件，调用 `compilition.addEntry` 将入口文件转换为 `dependence` 对象
2. 构建阶段
	1. **编译模块(make)**：根据 `entry` 对应的 `dependence` 创建 `module` 对象，调用 `loader` 将模块转译为标准 JS 内容，调用 JS 解释器将内容转换为 AST 对象，从中找出该模块依赖的模块，再 递归 本步骤直到所有入口依赖的文件都经过了本步骤的处理
	2. **完成模块编译**：上一步递归处理所有能触达到的模块后，得到了每个模块被翻译后的内容以及它们之间的 **依赖关系图**
3. 生成阶段
	1. **输出资源(seal)**：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`，再把每个 `Chunk` 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
	2. **写入文件系统(emitAssets)**：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

### 1.1 一些名词

1. `Entry`：编译入口，webpack 编译的起点
2. `Compiler`：编译管理器，webpack 启动后会创建 `compiler` 对象，该对象一直存活直到结束退出
3. `Compilation`：单次编辑过程的管理器，比如 `watch = true` 时，运行过程中只有一个 `compiler` 但每次文件变更触发重新编译时，都会创建一个新的 `compilation` 对象
4. `Dependence`：依赖对象，webpack 基于该类型记录模块间依赖关系
5. `Module`：webpack 内部所有资源都会以“module”对象形式存在，所有关于资源的操作、转译、合并都是以 “module” 为基本单位进行的
6. `Chunk`：编译完成准备输出时，webpack 会将 `module` 按特定的规则组织成一个一个的 `chunk`，这些 `chunk` 某种程度上跟最终输出一一对应
7. `Loader`：资源内容转换器，其实就是实现从内容 A 转换 B 的转换器
8. `Plugin`：webpack构建过程中，会在特定的时机广播对应的事件，插件监听这些事件，在特定时间点介入编译过程

## 2. 打包流程

- 初始化参数。获取用户在webpack.config.js文件配置的参数
- 开始编译。初始化compiler对象，注册所有的插件plugins，插件开始监听webpack构建过程的生命周期事件，不同环节会有相应的处理，然后开始执行编译
- 确定入口。根据webpack.config.js文件的entry入口，开始解析文件构建ast语法树，找寻依赖，递归下去
- 编译模块。递归过程中，根据文件类型和loader配置，调用相应的loader对不同的文件做转换处理，在找出该模块依赖的模块，递归本操作，直到项目中依赖的所有模块都经过了本操作的编译处理
- 完成编译并输出。递归结束，得到每个文件结果，包含转换后的模块以及他们之前的依赖关系，根据entry以及output等配置生成代码块chunk
- 打包完成。根据output输出所有的chunk到相应的文件目录

## 3. Loader 和 Plugin 是什么？区别是什么？

### Loader是什么？

`Loader`让`Webpack`去处理那些非JavaScript文件(webpack自身只理解javascript)。loader可以将所有类型的文件转换成webpack能处理的有效模块。然后利用webpack的打包能力，对它们进行处
理。

### Plugin 是什么？

插件可以用于执行其他范围更广的任务，插件的范围包括，打包优化，代码压缩，甚至可以重新定义环境中的变量。插件的目的是用于解决loader无法实现的其他事。

### 3. 1 以`.vue`文件为例，`vue-loader` 在构建过程中做了什么？

以一个典型的 `.vue` 文件为例

```vue
<template>
	<div>{{ message }}</div>
</template>

<script>
	export default {
		data() {
			return {
				message: 'Hello, Vue!'
			}
		}
	}
</script>

<style scoped>
	div { color: red; }
</style>
```

`vue-loader` 在构建过程中主要做了以下几件事
1. 将`.vue`文件解析成三个部分：`<template>`、`<script>`、`<style>`。这样一来，才能够让 Webpack的其他加载器和插件能够处理。
2. 处理`<template>`，`vue-loader` 会将 `<template>` 部分传递给 `vue-template-compiler` 进行编译，将 Vue 的模板语法编译为可执行的渲染函数。
3. 处理`<script>`部分，`<script>` 部分通常包含 Vue 组件的逻辑，`vue-loader` 会将其作为普通的 JavaScript 模块处理。它会使用 `babel-loader` 或其他 JavaScript 加载器对 `<script>` 中的代码进行转译，将 ES6 及以上的代码转换为浏览器可识别的代码，确保代码可以在不同的浏览器环境中运行。
4. 处理 `<style>` 部分
	1. 对于 `<style>` 部分，`vue-loader` 会根据配置使用不同的样式加载器进行处理。
	2. 若使用了 `scoped` 属性（如上述示例），`vue-loader` 会对样式进行局部化处理，确保样式仅应用于当前组件，而不会影响到其他组件。
	3. 样式加载器会将 CSS 代码转换为 JavaScript 代码，并在运行时将样式注入到页面中，或根据配置提取为单独的 CSS 文件。
5. 提供热重载（HMR）支持
	1. 在开发环境中，`vue-loader` 支持热重载功能
	2. 当修改 `.vue` 文件中的代码时，`vue-loader` 可以在不刷新整个页面的情况下，仅更新相应的组件，提高开发效率
6. 资源 URL 处理
	1. `vue-loader` 可以处理在模板和样式中使用的资源 URL，如 `<img src="@/assets/logo.png">` 或 `background-image: url('@/assets/background.jpg')`
	2. 它会将这些相对 URL 转换为最终打包后可以正确引用的 URL，确保资源可以被正确加载

## 4.常用的优化策略