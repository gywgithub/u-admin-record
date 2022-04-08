<template>
	<div class="topology posRel">
		<div class="mainBody" v-bind:style="{ minHeight: warpHeight + 'px' }">
			<svg id="topologyTree" class="treeStyle"></svg>
		</div>
	</div>
</template>

<script>
import * as d3 from "d3";
export default {
	name: "Topology",
	components: {},
	computed: {},
	watch: {},
	data() {
		return {
			warpHeight: "730px",
			treeHeight: 600,
			treewidth: 1566,
			treeData: {
				name: "衣服",
				children: [
					{
						name: "上衣",
						children: [
							{
								name: "短袖",
								value: "DX",
							},
							{
								name: "羽绒服",
								value: "YRF",
							},
						],
					},
					{
						name: "下衣",
						children: [
							{
								name: "短裤",
								value: "DK",
								children: [
									{
										name: "蓝色",
										value: "Blue",
									},
									{
										name: "红色",
										value: "Dark",
									},
								],
							},
							{
								name: "长裤",
								value: "CK",
							},
						],
					},
				],
			},
		};
	},
	mounted() {
		this.genTree();
		this.$nextTick(() => {
			this.warpHeight = this.$b.dynamicWinHeight(90);
		});
	},
	methods: {
		genTree() {
			console.log("——————input data——————");
			console.log(this.treeData);

			const svg = d3
				.select("#topologyTree")
				.attr("width", this.treewidth)
				.attr("height", this.treeHeight);

			const g = svg.append("g").attr("transform", "translate(0, 0)");

			//将数据结构化, 返回后的node节点及其后代均有如下属性
			//node.data, node.depth, node.height, node.parent, node.children, node.value
			const hierarchyData = d3.hierarchy(this.treeData);
			console.log("——————d3.hierarchy(data)——————");
			console.log(hierarchyData);

			//d3.tree()返回tree layout,后续链式写法对layout进行配置
			const treeLayout = d3
				.tree()
				.size([this.treewidth, this.treeHeight - 45])
				.separation((a, b) => {
					return a.parent === b.parent ? 1 : 2;
				});
			console.log("——————treeLayout——————");
			console.log(treeLayout);

			//将数据扔进layout,获取更易于布局的数据nodesData, 相对hierarchyData, 所有数据加上了.x,.y属性
			const nodesData = treeLayout(hierarchyData);
			console.log("——————nodesData——————");
			console.log(nodesData);

			console.log("——————节点展开，由于是画link，所以去除root节点");
			console.log(nodesData.descendants().slice(1));
			const links = g // eslint-disable-line
				.selectAll(".links")
				.data(nodesData.descendants().slice(1))
				.enter()
				.append("path")
				.attr("fill", "none")
				.attr("stroke", "#313131")
				.attr("stroke-width", 2)
				.attr("d", (d) => {
					return `
                M${d.x},${d.y}
                C${d.x},${(d.y + d.parent.y) / 2}
                ${d.parent.x},${(d.y + d.parent.y) / 2.5}
                ${d.parent.x},${d.parent.y}`;
				});

			const nodes = g
				.selectAll(".node")
				.data(nodesData.descendants())
				.enter()
				.append("g")
				.attr("transform", (d) => {
					return `translate(${d.x}, ${d.y})`;
				});

			//画矩形
			nodes
				.append("rect")
				.attr("width", 100)
				.attr("height", 45)
				.attr("x", "-50px")
				.attr("rx", "5px")
				.attr("fill", "#c03027");

			//插入文字
			nodes
				.append("text")
				.attr("dy", "28px")
				.attr("style", "text-anchor:middle")
				.style("fill", "#ffffff")
				.text((d) => {
					return d.data.name;
				});
		},
	},
};
</script>

<style lang="scss" scoped>
path {
	fill: none;
	stroke: #76bf8a;
	stroke-width: 3px;
}
.topology {
	background: #ffffff;
	.treeStyle {
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -783px;
		margin-top: -300px;
	}
}
</style>
