<template>
	<div class="dashboard">
		<el-row :gutter="40">
			<el-col :xs="24" :lg="6" class="card-panel-col">
				<div
					class="card-panel"
					@click="handleSetLineChartData('newVisitis')"
				>
					<div class="card-panel-icon-wrapper icon-people">
						<svg-icon
							icon-class="table"
							class-name="card-panel-icon"
						/>
					</div>
					<div class="card-panel-description">
						<div class="card-panel-text">经验墙</div>
						<count-to
							:start-val="0"
							:end-val="102400"
							:duration="2600"
							class="card-panel-num"
						/>
					</div>
				</div>
			</el-col>
			<el-col :xs="24" :lg="6" class="card-panel-col">
				<div
					class="card-panel"
					@click="handleSetLineChartData('messages')"
				>
					<div class="card-panel-icon-wrapper icon-message">
						<svg-icon
							icon-class="peoples"
							class-name="card-panel-icon"
						/>
					</div>
					<div class="card-panel-description">
						<div class="card-panel-text">作 者</div>
						<count-to
							:start-val="0"
							:end-val="81212"
							:duration="3000"
							class="card-panel-num"
						/>
					</div>
				</div>
			</el-col>
			<el-col :xs="24" :lg="6" class="card-panel-col">
				<div
					class="card-panel"
					@click="handleSetLineChartData('purchases')"
				>
					<div class="card-panel-icon-wrapper icon-money">
						<svg-icon
							icon-class="tree-table"
							class-name="card-panel-icon"
						/>
					</div>
					<div class="card-panel-description">
						<div class="card-panel-text">经 验</div>
						<count-to
							:start-val="0"
							:end-val="9280"
							:duration="3200"
							class="card-panel-num"
						/>
					</div>
				</div>
			</el-col>
			<el-col :xs="24" :lg="6" class="card-panel-col">
				<div
					class="card-panel"
					@click="handleSetLineChartData('shoppings')"
				>
					<div class="card-panel-icon-wrapper icon-shopping">
						<svg-icon
							icon-class="people"
							class-name="card-panel-icon"
						/>
					</div>
					<div class="card-panel-description">
						<div class="card-panel-text">客 服</div>
						<count-to
							:start-val="0"
							:end-val="13600"
							:duration="3600"
							class="card-panel-num"
						/>
					</div>
				</div>
			</el-col>
		</el-row>

		<el-row :gutter="32">
			<el-col :xs="24" :sm="24" :lg="8">
				<div class="chart-wrapper">
					<!-- 各职级用户数量分布图 -->
					<pie-chart />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="8">
				<div class="chart-wrapper">
					<!-- 用户近3个月的经验发布数量统计图 -->
					<bar-chart />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="8">
				<div class="chart-wrapper">
					<!-- 各职级用户近一个自然月的收益统计图 -->
					<line-chart :chart-data="lineChartData" />
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :xs="24" :lg="12">
				<el-card class="card" shadow="never">
					<div slot="header">
						<span>精选经验</span>
					</div>
					<el-timeline :reverse="reverse">
						<el-timeline-item
							v-for="(activity, index) in activities"
							:key="index"
							:timestamp="activity.timestamp"
							:color="activity.color"
						>
							{{ activity.content }}
						</el-timeline-item>
					</el-timeline>
				</el-card>
			</el-col>
			<el-col :xs="24" :lg="6" style="height: 480px">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>经验排行榜</span>
						<el-button
							style="float: right; padding: 3px 0"
							type="text"
							>查看全部</el-button
						>
					</div>
					<div v-for="o in 10" :key="o" class="mb19">
						{{ "列表内容 " + o }}
					</div>
				</el-card>
			</el-col>
			<el-col :xs="24" :lg="6" style="height: 480px">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>收益排行榜</span>
						<el-button
							style="float: right; padding: 3px 0"
							type="text"
							>查看全部</el-button
						>
					</div>
					<div v-for="o in 10" :key="o" class="mb19">
						{{ "列表内容 " + o }}
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import CountTo from "vue-count-to";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
const lineChartData = {
	newVisitis: {
		expectedData: [100, 120, 161, 134, 105],
		actualData: [120, 82, 91, 154, 162],
	},
	messages: {
		expectedData: [200, 192, 120, 144, 160, 130, 140],
		actualData: [180, 160, 151, 106, 145, 150, 130],
	},
	purchases: {
		expectedData: [80, 100, 121, 104, 105, 90, 100],
		actualData: [120, 90, 100, 138, 142, 130, 130],
	},
	shoppings: {
		expectedData: [130, 140, 141, 142, 145, 150, 160],
		actualData: [120, 82, 91, 154, 162, 140, 130],
	},
};
export default {
	components: {
		CountTo,
		LineChart,
		BarChart,
		PieChart,
	},
	data() {
		return {
			lineChartData: lineChartData.newVisitis,
			reverse: true,
			activities: [
				{
					id: "60fd6dbecd84d60001f99f33",
					content:
						"在github上获得了第一个star，感恩一位名叫Bequiet2014的github用户",
					timestamp: "2020-03-23",
				},
				{
					id: "60fd6defcd84d60001f9a039",
					content:
						"品牌升级：付费版vue2.x品牌升级为Admin Pro，付费版vue3.x品牌名升级为Admin Plus",
					timestamp: "最近更新",
				},
				{
					id: "60fd6df85c2db800016d442a",
					content:
						"暴雨无情人有情，风雨面前我们一起扛，如果vab开源版有幸帮到了您或您的公司，您通过使用vab开发的项目获得了可观的收入，那么在您自愿原则的基础上我们鼓励您为河南贡献自己的一份心意",
					timestamp: "最近更新",
				},
				{
					id: "610978795c2db80001a09dc5",
					content: "团结一心，共抗疫情，烟台加油！！",
					timestamp: "最近更新",
				},
				{
					id: "61b6e72cd00c060001339c27",
					content:
						"忘记历史就意味着背叛，否认罪责就意味着重犯。一切罔顾侵略战争历史的态度，一切美化侵略战争性质的言论，不论说了多少遍，不论说得多么冠冕堂皇，都是对人类和平和正义的侵害。对这些错误言行，爱好和平与正义的人们必须高度警惕、坚决反对。",
					timestamp: "南京大屠杀公祭日",
				},
				{
					id: "61c4752c39bf1000016e4439",
					color: "#0bbd87",
					content:
						"冬已至，春不远！众志成城，攻坚克难！愿长安，长长安！西安加油！",
				},
			],
		};
	},
	methods: {
		handleSetLineChartData(type) {
			this.$emit("handleSetLineChartData", type);
		},
	},
};
</script>

<style lang="scss" scoped>
.dashboard {
	margin-top: 18px;

	.card {
		height: 480px;
		-webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
		box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
	}

	.chart-wrapper {
		background: #fff;
		padding: 16px 16px 0;
		margin-bottom: 32px;
	}

	.card-panel-col {
		margin-bottom: 32px;
	}

	.card-panel {
		height: 108px;
		cursor: pointer;
		font-size: 12px;
		position: relative;
		overflow: hidden;
		color: #666;
		background: #fff;
		box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
		border-color: rgba(0, 0, 0, 0.05);

		&:hover {
			.card-panel-icon-wrapper {
				color: #fff;
			}

			.icon-people {
				background: #40c9c6;
			}

			.icon-message {
				background: #36a3f7;
			}

			.icon-money {
				background: #f4516c;
			}

			.icon-shopping {
				background: #34bfa3;
			}
		}

		.icon-people {
			color: #40c9c6;
		}

		.icon-message {
			color: #36a3f7;
		}

		.icon-money {
			color: #f4516c;
		}

		.icon-shopping {
			color: #34bfa3;
		}

		.card-panel-icon-wrapper {
			float: left;
			margin: 14px 0 0 14px;
			padding: 16px;
			transition: all 0.38s ease-out;
			border-radius: 6px;
		}

		.card-panel-icon {
			float: left;
			font-size: 48px;
		}

		.card-panel-description {
			float: right;
			font-weight: bold;
			margin: 26px;
			margin-left: 0px;

			.card-panel-text {
				line-height: 18px;
				color: rgba(0, 0, 0, 0.7);
				font-size: 16px;
				text-align: right;
				margin-bottom: 12px;
			}

			.card-panel-num {
				font-size: 20px;
			}
		}
	}
}

@media (max-width: 550px) {
	.card-panel-description {
		display: none;
	}

	.card-panel-icon-wrapper {
		float: none !important;
		width: 100%;
		height: 100%;
		margin: 0 !important;

		.svg-icon {
			display: block;
			margin: 14px auto !important;
			float: none !important;
		}
	}
}
</style>
