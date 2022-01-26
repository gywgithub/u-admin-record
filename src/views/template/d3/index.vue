<template>
	<div class="d-three">
		<div>
			<svg width="600" height="500" id="base">
				<g style="transform: translate(0, 10px)">
					<path :d="line" />
				</g>
			</svg>
			<svg id="treeSvg"></svg>
		</div>
	</div>
</template>

<script>
import * as d3 from "d3";
export default {
	name: "DThree",
	components: {},
	computed: {},
	watch: {},
	data() {
		return {
			data: [99, 71, 78, 25, 36, 92],
			line: "",
			treeHeight: 580,
			treewidth: 1366,
			treeData: {
				name: "root",
				children: [
					{
						name: "二级节点1",
						children: [
							{
								name: "A",
								value: "叶子节点",
							},
							{
								name: "B",
								value: "叶子节点",
							},
						],
					},
					{
						name: "二级节点2",
						children: [
							{
								name: "C",
								value: "叶子节点",
							},
							{
								name: "D",
								value: "叶子节点",
							},
						],
					},
				],
			},
		};
	},
	mounted() {
		this.calculatePath();
		this.genTree();
	},
	methods: {
		genTree() {
			console.log("——————input data——————");
			console.log(this.treeData);

			const svg = d3
				.select("#treeSvg")
				.attr("width", this.treewidth)
				.attr("height", this.treeHeight);

			const g = svg.append("g").attr("transform", "translate(0, 20)");

			//将数据结构化, 返回后的node节点及其后代均有如下属性
			//node.data, node.depth, node.height, node.parent, node.children, node.value
			const hierarchyData = d3.hierarchy(this.treeData);
			console.log("——————d3.hierarchy(data)——————");
			console.log(hierarchyData);

			//d3.tree()返回tree layout,后续链式写法对layout进行配置
			const treeLayout = d3
				.tree()
				.size([this.treewidth, this.treeHeight - 30])
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
			const links = g
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

			//画圆
			nodes
				.append("rect")
				.attr("width", 100)
				.attr("height", 45)
				.attr("fill", "#c03027");

			//插入文字
			nodes
				.append("text")
				.attr("dx", 0)
				.text((d) => {
					return d.data.name;
				});
		},
		getScales() {
			const x = d3.scaleTime().range([0, 430]);
			const y = d3.scaleLinear().range([210, 0]);
			d3.axisLeft().scale(x);
			d3.axisBottom().scale(y);
			x.domain(d3.extent(this.data, (d, i) => i));
			y.domain([0, d3.max(this.data, (d) => d)]);
			return { x, y };
		},
		calculatePath() {
			const scale = this.getScales();
			const path = d3
				.line()
				.x((d, i) => scale.x(i))
				.y((d) => scale.y(d));
			this.line = path(this.data);
		},
	},
};
</script>

<style lang="scss" scoped>
svg {
	margin: 25px;
}
path {
	fill: none;
	stroke: #76bf8a;
	stroke-width: 3px;
}
</style>
