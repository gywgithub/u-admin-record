<template>
	<div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
	mixins: [resize],
	props: {
		className: {
			type: String,
			default: "chart",
		},
		width: {
			type: String,
			default: "100%",
		},
		height: {
			type: String,
			default: "300px",
		},
	},
	data() {
		return {
			chart: null,
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.initChart();
		});
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		this.chart.dispose();
		this.chart = null;
	},
	methods: {
		initChart() {
			this.chart = echarts.init(this.$el, "macarons");

			this.chart.setOption({
				title: {
					text: "",
					left: "center",
					textStyle: {
						color: "#999",
						fontWeight: "normal",
						fontSize: 14,
					},
				},
				tooltip: {
					trigger: "item",
					formatter: "{a} <br/>{b} : {c} ({d}%)",
				},
				legend: {
					left: "center",
					bottom: "10",
					data: [
						"普通用户",
						"中级用户",
						"高级用户",
						"资深用户",
						"授权用户",
					],
				},
				series: [
					{
						name: "",
						type: "pie",
						roseType: "radius",
						radius: [15, 95],
						center: ["50%", "45%"],
						data: [
							{ value: 3120, name: "普通用户" },
							{ value: 2410, name: "中级用户" },
							{ value: 1260, name: "高级用户" },
							{ value: 410, name: "资深用户" },
							{ value: 230, name: "授权用户" },
						],
						animationEasing: "cubicInOut",
						animationDuration: 2600,
					},
				],
			});
		},
	},
};
</script>
