<template>
	<div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

const animationDuration = 6000;

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
						fontWeight: "bold",
						fontSize: 16,
					},
				},
				tooltip: {
					trigger: "axis",
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
					},
				},
				grid: {
					top: "30",
					left: "2%",
					right: "2%",
					bottom: "3%",
					containLabel: true,
				},
				xAxis: [
					{
						name: "",
						type: "category",
						data: [
							"普通用户",
							"中级用户",
							"高级用户",
							"资深用户",
							"授权用户",
						],
						axisTick: {
							alignWithLabel: true,
						},
					},
				],
				yAxis: [
					{
						name: "发布(篇数)",
						type: "value",
						axisTick: {
							show: false,
						},
					},
				],
				series: [
					{
						name: "一月",
						type: "bar",
						stack: "vistors",
						barWidth: "60%",
						data: [1752, 577, 656, 144, 93],
						animationDuration,
					},
					{
						name: "二月",
						type: "bar",
						stack: "vistors",
						barWidth: "60%",
						data: [1436, 879, 443, 242, 73],
						animationDuration,
					},
					{
						name: "三月",
						type: "bar",
						stack: "vistors",
						barWidth: "60%",
						data: [930, 467, 688, 166, 43],
						animationDuration,
					},
				],
			});
		},
	},
};
</script>
